// @ts-nocheck

import Container from "@/components/common/Container";
import {
  JobProposalsContainerStyled,
  JobProposalsHeader,
  JobProposalsTable,
  JobProposalsTableHeader,
  JobProposalsTableRow,
} from "./styled";
import { FaSearch, FaSort, FaStar } from "react-icons/fa";
import { useAppDispatch } from "@/utils/hooks/store";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getProposalsByJobId } from "@/store/thunks/proposalThunk";
import moment from "moment";

const JobProposalsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [proposals, setProposals] = useState([]);
  const [totalProposals, setTotalProposals] = useState(0);
  const session = useSession();
  const router = useRouter();

  const fetchProposals = async (jobId) => {
    const res = await dispatch(getProposalsByJobId(jobId));
    return res;
  };

  useEffect(() => {
    const jobId = router.query["id"];

    if (session?.data?.user.id && jobId) {
      fetchProposals(jobId).then((res) => {
        setProposals(res.payload);
        setTotalProposals(res.payload.length);
      });
    }
  }, [session]);

  return (
    <>
      <JobProposalsContainerStyled>
        <Container>
          <JobProposalsHeader>
            <h2>Total Applicants: {totalProposals}</h2>
            <div className="search-bar">
              <span className="icon">
                <FaSearch />
              </span>
              <input placeholder="Search Applicants" />
            </div>
            <button>Search</button>
          </JobProposalsHeader>

          <br />

          <JobProposalsTable>
            <JobProposalsTableHeader>
              <th>
                <span className="header-row-flex">
                  Full Name{" "}
                  <span className="icon">
                    <FaSort />
                  </span>
                </span>
              </th>
              <th>
                <span className="header-row-flex">
                  Rating{" "}
                  <span className="icon">
                    <FaSort />
                  </span>
                </span>
              </th>
              <th>
                <span className="header-row-flex">
                  Applied Date{" "}
                  <span className="icon">
                    <FaSort />
                  </span>
                </span>
              </th>
              <th>
                <span className="header-row-flex">
                  Action{" "}
                  <span className="icon">
                    <FaSort />
                  </span>
                </span>
              </th>
            </JobProposalsTableHeader>

            <div className="data">
              {proposals.map((p) => {
                return (
                  <JobProposalsTableRow key={p.id} className="data-row">
                    <td>
                      <span className="data-row-flex">
                        <img src={p.User.profileImage} />
                        <p>{`${p.User.firstName} ${p.User.lastName}`}</p>
                      </span>
                    </td>
                    <td>
                      <span className="data-row-flex">
                        <span className="icon">
                          <FaStar />
                        </span>
                        5.0
                      </span>
                    </td>
                    <td>{moment(p.createdAt).calendar()}</td>
                    <td>
                      <button
                        onClick={() => {
                          router.push(`/proposals/${p.id}/`);
                        }}
                      >
                        See Proposal
                      </button>
                    </td>
                  </JobProposalsTableRow>
                );
              })}
            </div>
          </JobProposalsTable>
        </Container>
      </JobProposalsContainerStyled>
    </>
  );
};

export default JobProposalsContainer;
