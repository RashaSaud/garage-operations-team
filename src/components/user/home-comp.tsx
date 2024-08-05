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
  const pendingReviews: DataItem[] = data.filter((review) => review.isShared);

  const whatDone: FaDataItem[] = facilites.filter((review) => review.isDone);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const x = today.toLocaleDateString();

  const latest = Number(x[2]) - 2;

  const late: DataItem[] = data.filter(
    (review) => Number(review.date[2]) == latest
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
    const worksheet = workbook.addWorksheet("Users");

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
      link.download = "users.xlsx";
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
          {data.length == 0 ? (
            <>
              {" "}
              <div className="flex justify-center items-center content-center  h-[400px]">
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
              <div className="flex   justify-center h-[800px] mobile:h-auto items-center content-center flex-col  text-lg font-medium">
                <div className=" flex-col shadow-md bg-white w-[900px] h-[100px] border-1 mb-5 border-gray-200 rounded-lg  flex items-center justify-center text-center ">
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
                  <div className=" py-1 grid grid-cols-3 w-[300px]">
                    <h1>{pendingReviews.length}</h1>
                    <h1>{whatDone.length}</h1>
                    <h1>{late.length}</h1>
                  </div>
                </div>
                <div className="grid grid-cols-3  h-[450px]  mobile:grid-cols-1    text-center items-center justify-center ">
                  {currentItems.map((item: DataItem, i) => (
                    <div
                      key={item.id}
                      className={`mx-1 ${
                        Number(item.date[2]) == latest ? " border-red-700" : ""
                      } my-1 py-2 px-2 mobile:w-[300px]   grid w-[400px]  border-[1px] shadow-md rounded-lg border-gray-300 items-center justify-center content-center`}
                    >
                      <div>Zone:{item.zone}</div>
                      <p>Location:{item.location}</p>
                      <p>Description:{item.description}</p>
                      <p>Notice By:{item.addedBy}</p>
                      <p>Date {item.date}</p>
                      <div className="flex flex-row gap-2 justify-center my-2">
                        <button
                          disabled={item.isShared}
                          className={` ${
                            item.isShared ? "bg-teal-600" : "bg-[#29bfa7]"
                          }  h-10 rounded-lg w-28 hover:bg-teal-600 px-1 text-white`}
                          onClick={() => {
                            shareDoc(item, i);
                          }}
                        >
                          {item.isShared == true ? "Shared" : "Share"}
                        </button>
                        <button
                          className="bg-[#e69779] hover:bg-[#da8867] w-28 h-10 rounded-lg text-white "
                          onClick={() => {
                            DeleteDocument(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {data.length <= 6 ? (
                  <></>
                ) : (
                  <div className="flex justify-center gap-2">
                    {currentPage == 0 ? (
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
                  className="text-blue-500 mb-56 mobile:mb-0 mobile:text-sm mobile:mt-3"
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
