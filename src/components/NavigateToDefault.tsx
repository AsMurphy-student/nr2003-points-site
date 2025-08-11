import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavigateToDefault() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/nr2003-points-site/2025-season/');
    }, []);
    
    return (
      <h1>Navigating</h1>      
    );
}

export default NavigateToDefault
