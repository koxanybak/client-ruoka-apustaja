import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { initialize_shopping_lists } from "../store/shoppinglists/shoppinglistReducer"
import ErrorComponent from "./ErrorComponent"


const ShoppingLists: React.FC<{ className?: string }> = ({ className }) => {
  const { shopping_lists } = useSelector((state: RootState) => state.shopping_lists)
  const shopping_list_error = useSelector((state: RootState) => state.shopping_lists.shopping_list_error)
  const user = useSelector((state: RootState) => state.system.logged_user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && !shopping_lists) {
      dispatch(initialize_shopping_lists(user))
    }
  }, [dispatch, user])
  
  if (!user) {
    return (
      <ErrorComponent
        message={"Sinun täytyy kirjautua sisään nähdäksesi ostoslistasi."}
      />
    )
  }
  if (shopping_list_error) {
    console.log({...shopping_list_error})
    return (
      <ErrorComponent
        message={shopping_list_error.message}
        status={shopping_list_error.status}
        retry_func={() => dispatch(initialize_shopping_lists(user))}
      />
    )
  }

  return (
    <div className={className}>
      {shopping_lists 
        ?
          <ul>
            {shopping_lists.map(sl => (
              <div key={sl.id}>
                {sl.name}
              </div>
            ))}
          </ul>
        :
          <div>
            Ladataan...
          </div>
      }
    </div>
  )
}

export default ShoppingLists