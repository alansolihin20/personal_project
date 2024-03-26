'use client';
import * as XLSX from 'xlsx';

const ExportToExcelButton = ({ data, filename }) => {
  const exportExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + fileExtension;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button className="btn btn-success" onClick={exportExcel}>
      Export To Excel
    </button>
  );
};

export default ExportToExcelButton;
