
import { createContext, useEffect, useState } from "react";
import { userObserver } from "../auth/Firebase";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        userObserver(setCurrentUser)
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}} >
            {props.children}
            {/* eger {children} olarak alsaydik burada sadece {children} yazacaktik */}
        </AuthContext.Provider>
    )
};
// burada diyoruz ki bütün children larda currentUser i kullan.
// props lar app.js den gelir

export default AuthContextProvider;

/// AuthContextProvider bir component dir. 
// öncelikle burada bir provide saglama islemi yapiyoruz ki baska yerlerde consume yapabilelim.

// AuthContextProvider bir component oldugu icin icinde hook kullanabildik. ve bu component ilk render edildiginde currentUser bilgimiz güncellenecek.

// burada context in provide islemleri tamamlandi. artik ihtiyacimiz olan yerlerde consume edilebilir. mesela navbar da
