import { useContext , createContext , useState } from "react";

const NotificationContext = createContext();

export const useNotificationContext = () => useContext(NotificationContext)

const NotificationContextProvider = ({ children }) => {
    const [notificationsCount , setNotificationsCount] = useState(0);

    return (
        <NotificationContext.Provider 
            value={{
                notificationsCount , setNotificationsCount ,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

 
export default NotificationContextProvider;