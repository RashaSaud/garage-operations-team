import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "src/config/config";
import * as ExcelJS from "exceljs";
import { useState } from "react";
import Loader from "src/pages/loading";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { BsDatabaseFillX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import FacilitesExportExcelSheet from "./facilites-excel-sheet";
import { MdDone } from "react-icons/md";
interface FaDataItem {
  // Define the structure of your data here
  id: string;
  zone: string;
  location: string;
  description: string;
  date: string;
  isDone: boolean;
  addedBy: string;
}
interface DataItem {
  // Define the structure of your data here
  id: string;
  imageUrl:string
  zone: string;
  location: string;
  description: string;
  date: string;
  addedBy: string;
  isShared: boolean;
}
export function HomeComp() {
  const nav = useNavigate();
  const [facilites, setFacilites] = useState<FaDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "notices"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DataItem[];
        setData(data);

        const querySnapshotFa = await getDocs(collection(db, "facilities"));
        const dataArrayFa: FaDataItem[] = [];
        querySnapshotFa.forEach((doc) => {
          dataArrayFa.push({ id: doc.id, ...doc.data() } as FaDataItem);
        });
        setFacilites(dataArrayFa);
      } catch (error) {
        //    setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const shareDoc = async (data: DataItem, index: number) => {
    console.log(index);
    setIsLoading(true);

    await addDoc(collection(db, "facilities"), {
      zone: data.zone,
      location: data.location,
      description: data.description,
      addedBy: "operation Team",
      date: data.date,
      imageUrl:data.imageUrl ? data.imageUrl : null,
      isDone: false,
    }).then(async () => {
      const docRef = doc(db, "notices", data.id);
      await updateDoc(docRef, {
        isShared: true,
      });
    });
    const querySnapshot = await getDocs(collection(db, "notices"));
    const data_ = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as DataItem[];
    setData(data_);
    setIsLoading(false);
  };

  const [data, setData] = useState<DataItem[]>([]);

  const whatDone: FaDataItem[] = facilites.filter((review) => review.isDone);
  const pendingReviews: DataItem[] = data.filter((review,i) => {
    if(review.isShared === true && whatDone[i]?.isDone !== true){
      return review.isShared
      
    }else{
      return null
    }
  });

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const x = today.toLocaleDateString();

  const latest = Number(x[2]) - 2;

  const late: DataItem[] = data.filter(
    (review) => Number(review.date[2]) <= latest
  );
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / itemsPerPage) - 1)
    );
  };

  const currentItems = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("notices");

    worksheet.addRow(["Zone", "Description", "Location", "date", "Notice By"]);

    data.forEach((item: any) => {
      worksheet.addRow([
        item.zone,
        item.description,
        item.location,
        item.date,
        item.addedBy,
      ]);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "operation-notices.xlsx";
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  const deleteAllDocuments = async (collectionPath: string) => {
    try {
      const collectionRef = collection(db, collectionPath);
      let querySnapshot = await getDocs(
        query(collectionRef, limit(data.length))
      );

      while (!querySnapshot.empty) {
        setIsLoading(true);
        const batch = writeBatch(db);
        querySnapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();

        querySnapshot = await getDocs(query(collectionRef, limit(data.length)));
        const data_ = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DataItem[];
        setData(data_);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error deleting documents:", error);
    }
  };
  const DeleteDocument = async (documentId: string) => {
    try {
      const docRef = doc(db, "notices", documentId); // Replace 'yourCollection' with your collection name
      setIsLoading(true);

      await deleteDoc(docRef);
      const querySnapshot = await getDocs(collection(db, "notices"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DataItem[];
      setData(data);
      setIsLoading(false);
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.length === 0 ? (
            <>
              {" "}
              <div className="flex justify-center items-center content-center   h-[400px]">

                <div className="flex-row items-center justify-center content-center  text-center mt-20 ">
                  <BsDatabaseFillX className="text-[200px] text-gray-400" />

                  <p className="text-xl front-bold  text-gray-400 mt-4 ">
                    !No Data Found
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center flex-col content-center  items-center  ">
                
                <div className=" flex-col  mobile:w-fit mobile:h-fit shadow-md bg-white w-[900px] tablet:w-auto h-[100px] tablet:h-fit border-1  border-gray-200 rounded-lg mb-5  flex items-center justify-center text-center ">
                  <div className="  grid grid-cols-3 w-[300px]">
                    <h1>
                      In progress <hr />
                    </h1>

                    <h1>
                      Done <hr />
                    </h1>
                    <h1>
                      Late <hr />
                    </h1>
                  </div>
                  <div className=" py-1 grid grid-cols-3 w-[300px]  ">
                    <h1>{pendingReviews.length}</h1>
                    <h1>{whatDone.length}</h1>
                    <h1>{late.length}</h1>
                  </div>
                </div>
                <div className="grid grid-cols-3 mobile:hidden ">
                  {currentItems.map((item: DataItem, i) => (
                    // <div
                    //   key={item.id}
                    //   className={`mx-1 ${
                    //     Number(item.date[2]) <= latest ? " border-red-700" : ""
                    //   } my-1 py-2 px-2 mobile:w-[300px]   grid w-[400px]  border-[1px] shadow-md rounded-lg border-gray-300 items-center justify-center content-center`}
                    // >
                    //   <div>Zone:{item.zone}</div>

                    //   <p>Location:{item.location}</p>
                    //   <p>Description:{item.description}</p>
                    //   <p>Notice By:{item.addedBy}</p>
                    //   <p>Date {item.date}</p>
                    //   <div className="flex flex-row gap-2 justify-center my-2">
                    //     <button
                    //       disabled={item.isShared}
                    //       className={` ${
                    //         item.isShared ? "bg-teal-600" : "bg-[#29bfa7]"
                    //       }  h-10 rounded-lg w-28 hover:bg-teal-600 px-1 text-white`}
                    //       onClick={() => {
                    //         shareDoc(item, i);
                    //       }}
                    //     >
                    //       {item.isShared === true ? "Shared" : "Share"}
                    //     </button>
                    //     <button
                    //       className="bg-[#e69779] hover:bg-[#da8867] w-28 h-10 rounded-lg text-white "
                    //       onClick={() => {
                    //         DeleteDocument(item.id);
                    //       }}
                    //     >
                    //       Delete
                    //     </button>
                    //   </div>
                    // </div>
                    <div className={`max-w-sm  mx-2 my-1 border-4 border-dashed ${ Number(item.date[2]) <= latest ? " border-red-700" : "border-[#5ebba8] "}  rounded-lg shadow`}>
    
        {item.imageUrl ? <img className="rounded-t-lg h-44 w-full" src={item.imageUrl} alt=" " />: <img className="rounded-t-lg h-44 w-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoBAeYwmKevvqaidagwfKDT6UXrei3kiWYlw&s' alt=" " />}
  
    <div className="p-5">
        
            <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Zone : {item.zone}</h2>
            <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Date : {item.date}</h2>

            <h1>Location {item.location}</h1>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>

        <button 
        onClick={()=>{   shareDoc(item, i);}}
        disabled={item.isShared}  className={`inline-flex mx-1 items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 ${item.isShared === false ? 'rounded-lg  ': 'rounded-full'}`}>
        {item.isShared ? <MdDone /> : "Share"}
            
        </button>
        <button 
        onClick={()=>{    DeleteDocument(item.id);}}
        className={`inline-flex rounded-lg  items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-teal-300 `}>
        Delete
            
        </button>
       
    </div>
</div>
                  ))}
                </div>

                {data.length <= 6 ? (
                  <></>
                ) : (
                  <div className="flex  justify-center gap-2 laptop:mt-[300px]">
                    {currentPage === 0 ? (
                      <></>
                    ) : (
                      <button
                        className="px-2 py-1 my-2  text-2xl rounded-md bg-teal-500 hover:bg-teal-600 text-gray-700"
                        onClick={handlePrev}
                      >
                        <IoMdArrowDropright />
                      </button>
                    )}
                    {currentPage ===
                    Math.ceil(data.length / itemsPerPage) - 1 ? (
                      <></>
                    ) : (
                      <button
                        className="px-2 py-1 my-2 text-2xl rounded-md ml-2 bg-teal-500 hover:bg-teal-600 text-gray-700"
                        onClick={handleNext}
                      >
                        <IoMdArrowDropleft />
                      </button>
                    )}
                  </div>
                )}

                {/* Export button */}
                <div className="flex gap-2 mobile:w-[300px]  ">
                  <button
                    onClick={handleExport}
                    className="bg-[#faca10] border-dashed border-2  hover:bg-[#facb10d6] px-2 py-1 rounded-md"
                  >
                    {" "}
                    Export to Excel{" "}
                  </button>
                  <button
                    onClick={() => {
                      deleteAllDocuments("notices");
                    }}
                    className="bg-[#e69779] hover:bg-[#da8867] border-dashed border-2  px-2 py-1 rounded-md"
                  >
                    Delete All
                  </button>
                  <FacilitesExportExcelSheet />
                </div>
                <button
                  className="text-blue-500  mobile:mb-0 mobile:text-sm mobile:mt-3"
                  onClick={() => {
                    nav("/update-password");
                  }}
                >
                  Change Password
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
