import fs from 'fs';
import path from 'path';
import classes from './event.module.css'

const RenderEventImages = ({ imagePaths }) => {
  if (!imagePaths) {
    return <div>No Images were found for this event.</div>;
  }

  return (
    <div className={classes.eventImages}>
      {imagePaths.map((src, index) => {
        return (
          <div key={index}>
            <img src={src} alt={`Image ${index}`} width={400} height={300} />
            <div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderEventImages;

export async function getServerSideProps(context) {
  console.log(context);
  const { event } = context.params;

  const folderPath = path.join(process.cwd(), `public/images/events/${event}`);

  try {
    const imageFiles = fs.readdirSync(folderPath);

    const imagePaths = imageFiles.map((fileName) => `/images/events/${event}/${fileName}`);

    return {
      props: {
        imagePaths
      }
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        imagePaths: null
      }
    };
  }
}
// export async function getServerSideProps(event, category) {
//   // const { event } = context.params;

//   const folderPath = path.join(process.cwd(), `public/images/${category}/${event}`);

//   try {
//     const imageFiles = fs.readdirSync(folderPath);

//     const imagePaths = imageFiles.map((fileName) => `/images/${category}/${event}/${fileName}`);

//     return {
//       props: {
//         imagePaths
//       }
//     };
//   } catch (error) {
//     console.error(error);

//     return {
//       props: {
//         imagePaths: null
//       }
//     };
//   }
// }
