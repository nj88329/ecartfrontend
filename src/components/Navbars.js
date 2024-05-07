import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from '@chakra-ui/react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Navbars.css';
import { FaRegHeart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { cartScreen , loginLogout} from '../features/cartSlice';
import { useDispatch ,  useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Navbars = () => {


  let REACT_APP_API_URL='https://your-render-app.onrender.com'
  // const history = useHistory();
  const cartLink = useSelector((state) => state.cart.cartLink);
  const dispatch = useDispatch();
  


    const EmptyCart = async()=>{
      try{
        let response = await axios.delete(`${REACT_APP_API_URL}/api/products/`,  {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      });

      console.log('responsedelete' , response);
     }
       catch(err){
           console.log('err', err);
       }   
     }

   const logout = ()=>{
    localStorage.setItem('token', '');
    console.log('logout', localStorage.getItem('token'));
   }

  return (
    <Navbar className="bg-body-tertiary justify-content-between" >
    
      <Form inline>
      
        <Row>
          <Col xs="auto" style={{display:"flex"}}>
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
             <Button type="submit">Submit</Button>
          </Col>
          <Col xs="auto">
            
          </Col>
        </Row>
     
      </Form>
      <div style={{display:"flex" , gap:"20px"}}>
      
      {
        (cartLink)?
       <h5>Empty Cart <Button style={{backgroundColor:"red"}}><FaRegHeart style={{color:"black"}} onClick={()=>{EmptyCart(); dispatch(cartScreen());}}/></Button></h5> :
       <></>

      }
         
            <h6> <Link to='/Cart'> <Button  onClick={() => dispatch(cartScreen())}> <GiShoppingBag style={{color:"brown"}} />
            {
            (!cartLink)?
              'Go to Cart':'GO Back'
            }
             </Button></Link>
             </h6> 
      </div>
      <Button variant="danger" onClick ={() =>dispatch(loginLogout(false))} >Logout</Button>
    </Navbar>
  );
}

export default Navbars;


