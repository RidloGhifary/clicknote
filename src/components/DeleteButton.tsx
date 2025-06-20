export default function DeleteButton() {
  return (
    <button
      data-pin-comment
      onClick={() => alert("delete functionality not implemented yet")}
      className={`p-1.5 cursor-pointer hover:opacity-80 rounded-full bg-red-600 flex items-center justify-center shadow-2xs`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="17px"
        viewBox="0 -960 960 960"
        width="17px"
        fill="#ffffff"
      >
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
      </svg>
    </button>
  );
}
