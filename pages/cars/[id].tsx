import { useRouter } from 'next/router';
import public_cars  from '../../apis/public_cars';

import Head from 'next/head';


const Car = (props) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>{props.car.color} {props.car.id}</title>
            </Head>
            <h1>Hello {id}</h1>
            <img src={props.car.image} />
        </>
    );
}


export default Car;

/* static rendering */
// export async function getStaticProps({params}){
//     const req = await public_cars.get(`/${params.id}.json`);
//     const data = req.data;

//     return {
//         props: {car: data}
//     }
// }

// export async function getStaticPaths(){
//     const req = await public_cars.get('/cars.json');
//     const data = req.data;

//     const paths = data.map((car) => {
//         return {params: {id: car}}
//     })

//     return {
//         paths,
//         fallback: false
//     }
// }

/* server side rendering */
// export async function getServerSideProps({params}){
//     const req = await public_cars.get(`/${params.id}.json`);
//     const data = req.data;

//     return {
//         props: {car: data}
//     }
// }

/* incremental static rendering */
export async function getStaticProps({params}){
    const req = await public_cars.get(`/${params.id}.json`);
    const data = req.data;

    return {
        props: {car: data},
        //makes it so pages a rerendered every 30 seconds
        revalidate: 30
    }
}

export async function getStaticPaths(){
    // const req = await public_cars.get('/cars.json');
    // const data = req.data;
    const data = [];

    const paths = data.map((car) => {
        return {params: {id: car}}
    })

    return {
        paths,
        fallback: false
    }
}
