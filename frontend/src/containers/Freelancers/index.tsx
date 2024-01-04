import Container from "@/components/common/Container";
import { FreelancerBox, FreelancerBoxHeader, FreelancerBoxesGrid, FreelancerPagination, FreelancerSearchInput, FreelancerTag, FreelancerTagContainer } from "./styled";
import { FaSearch } from "react-icons/fa";

const FreelancersContainer: React.FC = () => {
    return <>
        <Container>
            <br/><br/>
            <h3 className="font-montserrat font-medium text-2xl text-black text-left">
                Discover Freelancers
            </h3>
            <br/>
            <FreelancerSearchInput>
                <div className="icon-div"><FaSearch /></div>
                <input placeholder="Search by keyword" />
                <div className="button-div"><button>Search</button></div>
            </FreelancerSearchInput>
            <br/>
            <FreelancerBoxesGrid>
                { [1,2,3,4,5,6,7,8].map(e => {
                    return <FreelancerBox>
                    <FreelancerBoxHeader>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Fs8Arl_LnQwQ8ppF4IpZJ88JMXu4SHf7iFLcKQtUqg&s" />
                        <div>
                            <h3 className="font-montserrat font-medium text-2xl text-black text-left">Ubaid R.</h3>
                            <p className="freelancer-time">Central Time (US)</p>
                        </div>
                    </FreelancerBoxHeader>
                    <p className="freelancer-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, repellendus. Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                    <FreelancerTagContainer>
                        <FreelancerTag>Web Design</FreelancerTag>
                        <FreelancerTag>UI</FreelancerTag>
                        <FreelancerTag>UX</FreelancerTag>
                    </FreelancerTagContainer>
                </FreelancerBox>
                }) }
            </FreelancerBoxesGrid>
            <br/>
            <FreelancerPagination>
                <a href="#">&laquo;</a>
                <a className="active">1</a>
                <a>2</a>
                <a>3</a>
                <a href="#">&raquo;</a>
            </FreelancerPagination>
        </Container>
    </>
}

export default FreelancersContainer;
