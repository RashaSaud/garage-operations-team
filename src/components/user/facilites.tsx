import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "src/config/config";
import { MdDone } from "react-icons/md";
import { useState } from "react";
import Loader from "src/pages/loading";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { BsDatabaseFillX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import FacilitesExportExcelSheet from "./facilites-excel-sheet";

export default function FacilitesComp() {
  const [isLoading, setIsLoading] = useState(true);

  interface DataItem {
    // Define the structure of your data here
    id: string;
    zone: string;
    location: string;
    description: string;
    date: string;
    isDone: boolean;
    addedBy: string;
    imageUrl:string
  }

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "facilities"));
      const dataArray: DataItem[] = [];
      querySnapshot.forEach((doc) => {
        dataArray.push({ id: doc.id, ...doc.data() } as DataItem);
      });
      setData(dataArray);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  const nav = useNavigate();
  const [data, setData] = useState<DataItem[]>([]);
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

  const updateIsDone = async (documentId: string) => {
    try {
      const facilityRef = doc(db, "facilities", documentId); // Get reference using document ID
      setIsLoading(true);

      await updateDoc(facilityRef, {
        isDone: true, // Update only the isDone field
      }).then(() => {
        const fetchData = async () => {
          const querySnapshot = await getDocs(collection(db, "facilities"));
          const dataArray: DataItem[] = [];
          querySnapshot.forEach((doc) => {
            dataArray.push({ id: doc.id, ...doc.data() } as DataItem);
          });
          setData(dataArray);
          setIsLoading(false);
        };
        fetchData();
      });

      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const x = today.toLocaleDateString();

  const latest = Number(x[2]) - 2;

  // const late: DataItem[] = data.filter(
  //   (review) => Number(review.date[2]) <= latest
  // );

  const currentItems = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.length === 0 ? (
            <>
              {" "}
              <div className="flex justify-center items-center content-center  h-[400px]">
                <div className="flex-row items-center justify-center content-center  text-center">
                  <BsDatabaseFillX className="text-[200px]" />

                  <p className="text-xl front-bold  text-gray-400 ">
                    !No data Found
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center ">
               
                <div className="grid grid-cols-3 gap-4   ">
                  {currentItems.map((item: DataItem, i) => (

<div className={`max-w-sm  border-4 border-dashed ${ Number(item.date[2]) <= latest ? " border-red-700" : "border-[#5ebba8] "}  rounded-lg shadow`}>
    
        {item.imageUrl ? <img className="rounded-t-lg h-44 w-full" src={item.imageUrl} alt=" " />: <img className="rounded-t-lg h-44 w-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoBAeYwmKevvqaidagwfKDT6UXrei3kiWYlw&s' alt=" " />}
  
    <div className="p-5">
    <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Zone : {item.zone}</h2>

            <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Date : {item.date}</h2>
            <h1>Location {item.location}</h1>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
        <button 
        onClick={()=>{   updateIsDone(item.id);}}
        disabled={item.isDone}  className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 ${item.isDone === false ? 'rounded-lg  ': 'rounded-full'}`}>
        {item.isDone ? <MdDone /> : "Done"}
            
        </button>
    </div>
</div>
                  ))}

                </div>

               

              
              </div> 
              {data.length <= 6 ? (
                  <></>
                ) : (
                  <div className="flex justify-center ">
                    {currentPage === 0 ? (
                      <></>
                    ) : (
                      <button
                        className="px-2 py-1 text-2xl rounded-md bg-teal-500 hover:bg-teal-600 text-gray-700"
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
                        className="px-2 py-1 text-2xl rounded-md ml-2 bg-teal-500 hover:bg-teal-600 text-gray-700"
                        onClick={handleNext}
                      >
                        <IoMdArrowDropleft />
                      </button>
                    )}
                  </div>
                )} 
                 <div className="flex justify-center flex-col  items-center ">
                 <button className="text-blue-500 pb-3 " onClick={()=>{nav('/update-password')}}>Change Password</button>

                 <FacilitesExportExcelSheet />
              
                 </div>
       
            </>
          )}
        </>
      )}
    </>
  );
}



