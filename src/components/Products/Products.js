// import { useState } from "react"
// import ListItem from"./ListItems/ListItem"
// import Form from "./Form"

// const Products=()=>{

//     const [items, setItem] = useState({
//         id: 0,
//         title: "Title of this Item 1",
//         price: 450,
//         discountedPrice: 340,
//         thumbnail: "listItem.png"
// }
// )

//     const handleInput = event =>{
//         setItem({
//             ...items,
//             [event.target.name]:event.target.value 
//         })
//     }

//     const submitForm = event => {
//         event.preventDefault();
//         if(items.discountedPrice > items.price) {
//             alert("Discounted Price cannot be greater than price")
//             return;
//         }
//         console.log("item updated",items)
//     }


//     return(
//         <div className={"product-List"}>
//             <div className={"product-List--wrapper"}>
//             <div className={"form"}>
//                 <Form item={items} onChangeInput={handleInput} onFormSubmission={submitForm}/>
//             </div>
//                 {/* <form onSubmit={submitForm}>
//                     <h2>Item card details</h2>
//                     <div className={"input-field"}>
//                         <label htmlFor="title">Title</label>
//                         <input 
//                             name="title"
//                             type="text" 
//                             placeholder="Enter title" 
//                             value={items.title} 
//                             onChange={handleInput}
//                             required
//                         />
//                     </div>

//                     <div className={"input-field"}>
//                         <label htmlFor="price">price</label>
//                         <input 
//                             name="price"
//                             type="number" 
//                             placeholder="Enter price" 
//                             value={items.price} 
//                             onChange={handleInput}
//                             required
//                         />
//                     </div>

//                     <div className={"input-field"}>
//                         <label htmlFor="discountedPrice">discountedPrice</label>
//                         <input 
//                             name="discountedPrice"
//                             type="number"
//                             placeholder="Enter discountedPPrice"
//                             value={items.discountedPrice}
//                             onChange={handleInput}
//                             required
//                             />
//                     </div>

//                     <div className={"input-field"}>
//                         <label htmlFor="thumbnail">thumbnail</label>
//                         <input 
//                             name="thumbnail"
//                             type="text" 
//                             placeholder="Enter thumbnail" 
//                             value={items.thumbnail} 
//                             onChange={handleInput}
//                             required
//                         />
//                     </div>
//                     <div className={"submit-wrap"}>
//                         <button >Update</button>
//                     </div>
//                 </form> */}
//                 <div>
//                     <div>
//                         <ListItem data={items}></ListItem>
//                         {/* <ListItem data={items[1]}></ListItem> */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Products







import { useEffect, useState } from "react"
import ListItem from "./ListItems/ListItem"
import axios from "axios"
import Loader from "../UI/Loader"
import { useNavigate, useLocation, useParams } from "react-router-dom"

const Products = () => {
    const [items, setItems] = useState([])
    const [loader, setLoader] = useState(true)
    const params = useParams()
    const history = useNavigate()
    const { search } = useLocation()
    const queryParams = new URLSearchParams(search).get("search")

    useEffect(() => {
        async function fetchItems() {
            try {
                let slug = `items.json`
                if(params.category) {
                    slug = `items-${params.category}.json`
                }
                if(queryParams) {
                    slug += `?search=${queryParams}`
                }
                // items-category-1.json
                const response = await axios.get(`https://react-guide-2021-default-rtdb.firebaseio.com/${slug}`)
                const data = response.data

                if(!data) {
                    handleNotFound();
                    return;
                }

                const transformedData = data.map((item, index) => {
                    return {
                        ...item,
                        id: index
                    }
                })
                // setLoader(false)
                setItems(transformedData)   
            } 
            catch (error) {
                // setLoader(false)
                console.log("Error: ", error)
                alert("Some error occurred");
            }
            finally {
                setLoader(false)
            }
        }

        fetchItems();

        return () => {
            setItems([])
            setLoader(true)
        }
    }, [params.category, queryParams])

    const handleNotFound = () => {
        history.push("/404")
    }

    return (
        <>
        <div className={"product-list"}>
            <div className={"product-list--wrapper"}>
                {
                    items.map(item => {
                        return (<ListItem key={item.id} data={item}/>)
                    })
                }
            </div>
        </div>
        { loader && <Loader/>}
        </>
    )
}

export default Products