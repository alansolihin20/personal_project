const getBank = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/data_rekening/', { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed To Fetch Data');
    }

    return res.json();
  } catch (error) {
    console.log('Error Loading Data', error);
    return { lunas: [] }; // Return an empty array as a default value in case of error
  }
};

export default getBank;
