const TourHeading = ({ tourData }) => {
  return (
    <div className="col-xl-8">
      <h1 className="text-25 fw-600">{tourData?.name}</h1>
      <div className="row x-gap-10 y-gap-10 items-center pt-10">
        <div className="col-auto">
          <div className="d-flex items-center">
            <div className="d-flex x-gap-5 items-center">
              <i className="icon-star text-10 text-yellow-1"></i>

              <i className="icon-star text-10 text-yellow-1"></i>

              <i className="icon-star text-10 text-yellow-1"></i>

              <i className="icon-star text-10 text-yellow-1"></i>

              <i className="icon-star text-10 text-yellow-1"></i>
            </div>

            <div className="text-14 text-light-1 ml-10">
              {tourData?.reviews} reviews
            </div>
          </div>
        </div>

        <div className="col-auto">
          <div className="row x-gap-10 items-center">
            <div className="col-auto">
              <div className="d-flex x-gap-5 items-center">
                <i className="icon-placeholder text-16 text-light-1"></i>
                <div className="text-15 text-light-1 text-nowrap">
                  {tourData?.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourHeading;
