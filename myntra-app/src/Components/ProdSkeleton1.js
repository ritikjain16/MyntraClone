import React from 'react'
import Skeleton from "@material-ui/lab/Skeleton";
const ProdSkeleton1 = () => {
    return (
        <div
        className="product-image-con"
        style={{ width: window.innerWidth / 2 - 12 ,margin:"3px"}}
      >
        <div className="product-image">
          {" "}
          <Skeleton
            variant="rect"
            width={window.innerWidth / 2 - 12}
            height={220}
            animation="wave"
          />
        </div>

        <div
          className="product-price-con"
          style={{ width: window.innerWidth / 2 - 14 }}
        >
          <Skeleton variant="text" width={90}  animation="wave"/>
          <Skeleton variant="text" width={120}  animation="wave"/>
          <Skeleton variant="text" animation="wave"/>
        </div>
      </div>
    )
}

export default ProdSkeleton1
