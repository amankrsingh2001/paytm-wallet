const InputBox = ({type, placeholder,label, id, onChange}) =>{
    return <div className="flex flex-col pl-3 w-full">
        <label className="px-2 mb-1 font-medium" for={id}>{label}</label>
        <input  className="border-2 outline-none px-2 py-1 w-[90%] rounded-md" type={type} placeholder={placeholder} id={id} onChange={onChange} required />
    </div>
}

export default InputBox