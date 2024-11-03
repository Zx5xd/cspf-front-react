export const DevHost = () =>{
    return import.meta.env.VITE_DEV_CSPF_HOST;
}

export const LocalHost = () =>  {
    return import.meta.env.VITE_LOCAL_HOST;
}

export const cspfHost = () => {
    return import.meta.env.VITE_CSPF_HOST;
}

export const migHost = () => {
    return import.meta.env.VITE_DEV_MG_HOST;
    // return import.meta.env.VITE_CSPF_HOST;
}