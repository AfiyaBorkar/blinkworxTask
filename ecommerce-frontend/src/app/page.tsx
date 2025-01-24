import OrderTable from "../components/OrderTable";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100">
    {/* Full height and width container */}
    <div className="w-full max-w-7xl p-4">
      <div className="w-full h-full flex justify-center items-center " style={{alignItems:"center"}}>
        <OrderTable />
      </div>
    </div>
  </div>
  
  );
}
