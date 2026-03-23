import React from 'react'
import samosa from '../shared/images/samosa.jfif';
import constData from '../shared/constant/constantfile';

const MyImagesComp = () => {
    return (
        <div>
            <h2>This is MY Images component</h2>
           <img src={samosa} alt='Samosa' height='200px' width='200px' /> <br/>
           {/* access images from constant file  */}
           <img src={constData.jalebi} alt='jalebi' height='200px' width='200px' /> 
           <img src={constData.dosa} alt='dosa' height='200px' width='200px' /> <br/>
             <video controls>
                <source src={constData.vdo} />
             </video>
               
        </div>
    )
}

export default MyImagesComp
