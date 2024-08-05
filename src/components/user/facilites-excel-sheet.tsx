

import { getDocs, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from 'src/config/config';
import * as ExcelJS from "exceljs";

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
function FacilitesExportExcelSheet() {
  const [data,setData]= useState<DataItem[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "facilities"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DataItem[];
        setData(data);
      } catch (error) {
        //    setError(error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleExportForFacilitesSheet = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.addRow(["Zone", "Description", "Location", "date","Notice By"]);

    console.log(data);
    
    data?.forEach((item: any) => {
      worksheet.addRow([item.zone, item.description, item.location,item.date,'operatin Team']); 
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
  return (
    <div>
      <button  className="bg-teal-500 border-dashed border-2 w-44 hover:bg-teal-600 px-2 py-1 rounded-md" onClick={handleExportForFacilitesSheet}>Export Facilites sheet</button>
    </div>
  )
}

export default FacilitesExportExcelSheet