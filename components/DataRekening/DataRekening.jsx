import React from 'react';
import getBank from './getBank';
import AddDataRekening from './AddDataRekening';
import DeleteDataRekening from './DeleteDataRekening';
import UpdateDataRekening from './UpdataDataRekening';

const DataRekening = async () => {
  const { banks } = await getBank();

  return (
    <div className="p-6">
      <div className="flex flex-row gap-5">
        <AddDataRekening />
      </div>

      <h1 className="text-2xl font-bold py-6">Data Rekening</h1>
      <div className="border  max-w-screen ">
        <div className="overflow-x-auto shadow-sm">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Rekening</th>
                <th>Atas Nama</th>
                <th>No Rekening</th>
                <th>Tampil Invoice</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {banks.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.namaRekening}</td>
                  <td>{data.atasNama}</td>
                  <td>{data.noRekening}</td>
                  <td>{data.tampilInvoice}</td>
                  <td className="flex flex-row gap-2">
                    <DeleteDataRekening {...data} />
                    <UpdateDataRekening {...data} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataRekening;
