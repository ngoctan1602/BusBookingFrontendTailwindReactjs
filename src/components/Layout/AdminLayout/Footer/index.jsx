import './main.css'

export default function Footer (){
    return (
        
<footer>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <h3>About Us</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.</p>
            </div>
            <div class="col-md-4">
                <h3>Contact Us</h3>
                <ul class="list-unstyled">
                    <li><i class="fa fa-map-marker"></i> 123 Main Street, New York, NY 10001</li>
                    <li><i class="fa fa-phone"></i> (123) 456-7890</li>
                    <li><i class="fa fa-envelope"></i> info@busbooking.com</li>
                </ul>
            </div>
            <div class="col-md-4">
                <h3>Follow Us</h3>
                <ul class="list-unstyled list-inline">
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                    <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                    <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>
    )
}