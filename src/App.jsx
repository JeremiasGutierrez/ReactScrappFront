import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./index.css";
import "./App.css";

function App() {
  const [precios, setPrecios] = useState([]);

  useEffect(() => {
    fetch("https://scrappapi.netlify.app/.netlify/functions/Scrapp/scrap")
      .then((response) => response.json())
      .then((data) => {
        const datosArray = [
          { Img: data.imgBit, Price: data.precioBit, Name: data.nombreBit },
          { Img: data.imgEth, Price: data.precioEth, Name: data.nombreEth },
          {
            Img: data.imgUsdt,
            Price: data.precioUsdt,
            Name: data.nombreUsdt,
          },
          { Img: data.imgBnb, Price: data.precioBnb, Name: data.nombreBnb },
          {
            Img: data.imgSol,
            Price: data.precioSolana,
            Name: data.nombreSolana,
          },
          {
            Img: data.imgUsdc,
            Price: data.precioUsdc,
            Name: data.nombreUsdc,
          },
          { Img: data.imgXrp, Price: data.precioXrp, Name: data.nombreXrp },
          {
            Img: data.imgDoge,
            Price: data.precioDoge,
            Name: data.nombreDoge,
          },
          { Img: data.imgTon, Price: data.precioTon, Name: data.nombreTon },
          { Img: data.imgTrx, Price: data.precioTrx, Name: data.nombreTrx },
        ];
        setPrecios(datosArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      header: "Imagen",
      accessorKey: "Img",
      cell: ({ getValue }) => (
        <div className="flex justify-center items-center">
          <img src={getValue()} alt="crypto" width="50" />
        </div>
      ),
    },
    { header: "Price", accessorKey: "Price" },
    {
      header: "Name",
      accessorKey: "Name",
    },
  ];

  const table = useReactTable({
    data: precios,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="container max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full table-auto border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-600"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border border-gray-300 text-center text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
