import React, { useEffect, useState } from 'react'
import { getMunicipios, postRegister } from '../api/formApi'
import { toast } from 'react-toastify';

export function useFormData() {

    const [municipios, setMunicipios] = useState([]);

    useEffect(() => {
        getMunicipios()
            .then(dato => setMunicipios(dato))
            .catch(error => toast.error('OCURRIÓ UN ERROR EN EL SERVIDOR.'))
    },[]);

    return { municipios }
}