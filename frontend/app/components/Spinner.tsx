import React from 'react';
import { Blocks } from 'react-loader-spinner'

type SpinnerProps = {
    
};

const Spinner:React.FC<SpinnerProps> = () => {
    
    return (
        <div>
            <Blocks
              height="80"
              width="80"
              color="#00FF00"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
        </div>
    )
}
export default Spinner;