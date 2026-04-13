
import osdagLogo from "../assets/homepage/osdag_logo.png";


const GroupDesignNavbar = () => {

  return (
    <div className="w-full">
      
      <div className="module_nav flex items-center justify-between px-4 bg-white w-full h-28">
        
        <div className="flex items-center gap-5">
          <img
            src={osdagLogo}
            alt="OSDAG Logo"
            className="w-10 h-7 object-contain"
          />
          <h2 className="font-bold text-lg">Group Design</h2>
        </div>

        <div></div>
      </div>
      <div className="bg-gray-200 h-5 w-full flex items-center px-1 gap-2 border-b border-gray-300">
        <button className="hover:bg-gray-300 px-1 rounded text-xs">File</button>
        <button className="hover:bg-gray-300 px-1 rounded text-xs">Edit</button>
        <button className="hover:bg-gray-300 px-1 rounded text-xs">
          Graphics
        </button>
        <button className="hover:bg-gray-300 px-1 rounded text-xs">Help</button>
      </div>
    </div>
  );
};

export default GroupDesignNavbar;
