import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Rating = ({ rating }) => {
    const arrayFromNumber = Array.from({ length: rating.star }, (_, index) => index);
    const arrayFromNumber1 = Array.from({ length: 5 - rating.star }, (_, index) => index);

    console.log(arrayFromNumber);
    const handleClickStar = (number) => (
        alert("Click star" + number)
    )

    return (
        <div class='flex w-search cursor-pointer h-[10px]' onClick={(e) => handleClickStar(rating.star)}>

            <div>
                {

                    arrayFromNumber.map((item, index) => (
                        <FontAwesomeIcon icon={faStar} color="yellow"></FontAwesomeIcon>
                    ))
                }
            </div>
            <div>
                {

                    arrayFromNumber1.map((item, index) => (
                        <FontAwesomeIcon icon={faStar} style={{ color: "#7b808a" }} />
                    ))
                }
            </div>
            <p>{rating.sum}</p>


        </div>
    );
}

export default Rating;