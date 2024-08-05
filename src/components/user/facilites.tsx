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
isDone:boolean
    addedBy: string;
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
  const nav = useNavigate()
  const [data, setData] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(data.length / itemsPerPage) - 1)
    );
  };

  const updateIsDone = async (documentId:string) => {
    try {
      const facilityRef = doc(db, "facilities", documentId); // Get reference using document ID
      setIsLoading(true)

      await updateDoc(facilityRef, {
        isDone: true, // Update only the isDone field
      }).then(()=>{
        const fetchData = async () => {
          const querySnapshot = await getDocs(collection(db, "facilities"));
          const dataArray: DataItem[] = [];
          querySnapshot.forEach((doc) => {
            dataArray.push({ id: doc.id, ...doc.data() } as DataItem);
          });
          setData(dataArray);
          setIsLoading(false)
        }
        fetchData()
      })

      console.log("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

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
          {data.length == 0 ? (
            <>
              {" "}
              <div className="flex justify-center items-center content-center  h-[400px]">
                <div className="flex-row items-center justify-center content-center  text-center">
                  <BsDatabaseFillX className="text-[200px]"/>

                  <p className="text-xl front-bold  text-gray-400 ">
                    !No data Found
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center content-center flex-col py-2 text-lg font-medium">
                <div className="grid grid-cols-3 text-center items-center justify-center content-center">
                  {currentItems.map((item: DataItem, i) => (
                    <div
                      key={item.id}
                      className="mx-1  border-dashed  border-[#5ebba8] items-center justify-center content-center my-2 py-2 px-2 grid w-[400px] border-[1px] shadow-md rounded-lg "
                    >
                      <p>Zone:{item.zone}</p>
                      <p>Location:{item.location}</p>
                      <p>Description:{item.description}</p>
                      <p>Notice By :{item.addedBy}</p>
                      <p>Date {item.date}</p>
                      <button                         disabled={item.isDone}
className={`border w-22 bg-teal-500 ${item.isDone ? 'rounded-full bg-teal-500 w-5 ' : 'rounded-lg  hover:bg-teal-700'}  text-white `} onClick={()=>{updateIsDone(item.id)}}>{item.isDone ? <MdDone />
  : 'Done'}</button>
                    </div>
                  ))}
                </div>

                {data.length <= 9 ? (
                  <></>
                ) : (
                  <div className="flex justify-center mt-4 mb-4  gap-2">
                    {currentPage == 0 ? (
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

<FacilitesExportExcelSheet/>
                {/* Export button */}
                <button className="text-blue-500 mb-56" onClick={()=>{nav('/update-password')}}>Change Password</button>

              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
