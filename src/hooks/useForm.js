import { useState } from "react";

export function useForm(inicialValues) {
  
    // Obtenemos dartos que nesitaremos
    const [form, setForm] = useState(inicialValues); 

    // Obtendremos los datos del formaluario usando onChange
    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm(prev => ({...prev, [name]:value}));
    }

    return {form, handleChange , setForm}
}