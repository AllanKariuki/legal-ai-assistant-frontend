const Header = () => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center gap-2 bg-gray-200 spce-x-2 rounded-full px-4 py-3">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path d="M3 3h18v18H3V3zM5 5v5h5V5H5zM5 14v5h5v-5H5zM14 5v5h5V5h-5z" stroke="currentColor" strokeWidth="2"/>
      </svg>
      <span className="text-black">New chat</span>
    </div>
  </div>
);

export default Header;