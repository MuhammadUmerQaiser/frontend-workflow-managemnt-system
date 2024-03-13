import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../../../../components/User/UserLayout";
import Table from "../../../../components/common/table/Table";
import AddModal from "../../../../components/common/modal/AddModal";
import EditModal from "../../../../components/common/modal/EditModal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { AdminService } from "../../../../services/admin/admin.service";
import { useSnackbar } from "notistack";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Team = () => {
  const fields = ["_id", "name", "member", "action"];
  const [teams, setTeams] = useState([]);
  const [editTeamData, setEditTeamData] = useState({
    name: "",
    member: "",
    membersList: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [teamData, setTeamData] = useState({
    name: "",
    member: "",
    membersList: [],
  });
  const adminService = useMemo(() => new AdminService(), []);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name == "membersList") {
      setTeamData({
        ...teamData,
        membersList: typeof value === "string" ? value.split(",") : value,
      });
    } else {
      setTeamData({
        ...teamData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name == "membersList") {
      setEditTeamData({
        ...editTeamData,
        membersList: typeof value === "string" ? value.split(",") : value,
      });
    } else {
      setEditTeamData({
        ...editTeamData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getAllTeams = async () => {
    try {
      const endpoint = `${
        process.env.REACT_APP_BACKEND_URL
      }/get-all-teams?page=${currentPage}&paginatedData=${true}`;
      const response = await adminService.getData(endpoint);
      if (response.status === 200) {
        setTeams(response?.data?.data);
        setCurrentPage(response?.data?.currentPage);
        setPageSize(response?.data?.pageSize);
        setTotalPages(response?.data?.totalPages);
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const deleteTeam = async (id) => {
    try {
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/delete-team/${id}`;
      const response = await adminService.deleteData(endpoint, id);
      if (response.status === 200) {
        getAllTeams();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const addModalForm = () => {
    return (
      <form className="row g-3" method="POST">
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            value={teamData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Members
          </label>
          <input
            type="number"
            className="form-control"
            id="member"
            name="member"
            required
            value={teamData.member}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Members Name
          </label>
          <FormControl sx={{ m: 1, width: 450 }}>
            <InputLabel id="demo-multiple-name-label">Members Name</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="membersList"
              multiple
              value={teamData.membersList}
              onChange={handleChange}
              input={<OutlinedInput label="Members Name" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, teamData.membersList, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </form>
    );
  };

  const editModalForm = () => {
    return (
      <form className="row g-3" method="POST">
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            value={editTeamData.name}
            onChange={handleEditChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Members
          </label>
          <input
            type="number"
            className="form-control"
            id="member"
            name="member"
            required
            value={editTeamData.member}
            onChange={handleEditChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Members Name
          </label>
          <FormControl sx={{ m: 1, width: 450 }}>
            <InputLabel id="demo-multiple-name-label">Members Name</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              name="membersList"
              multiple
              value={editTeamData.membersList}
              onChange={handleEditChange}
              input={<OutlinedInput label="Members Name" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, editTeamData.membersList, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </form>
    );
  };

  const createTeam = async (e) => {
    e.preventDefault();
    if (!teamData.name || !teamData.member || !teamData.membersList) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/create-team`;
      // const data = { name: name };
      const response = await adminService.postData(endpoint, teamData);
      if (response.status === 200) {
        getAllTeams();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        setTeamData({
          name: "",
          member: "",
          membersList: [],
        });
        //close the modal
        const addModalCloseButton = document.getElementById(
          "addModalCloseButton"
        );
        if (addModalCloseButton) {
          addModalCloseButton.click();
        }
      }
      if (response?.response?.status === 500) {
        enqueueSnackbar(response?.response?.data?.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const editTeam = async (e) => {
    e.preventDefault();
    if (
      !editTeamData.name ||
      !editTeamData.member ||
      !editTeamData.membersList
    ) {
      enqueueSnackbar("Please fill in all the fields", {
        variant: "error",
        autoHideDuration: 2000,
      });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const endpoint = `${process.env.REACT_APP_BACKEND_URL}/update-team/${editTeamData._id}`;
      // const data = { name: editDomainName };
      const response = await adminService.putData(endpoint, editTeamData);
      if (response.status === 200) {
        getAllTeams();
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
        setEditTeamData({
          name: "",
          member: "",
          membersList: [],
        });
        //close the modal
        const editModalCloseButton = document.getElementById(
          "editModalCloseButton"
        );
        if (editModalCloseButton) {
          editModalCloseButton.click();
        }
      }
      if (response?.response?.status === 500) {
        enqueueSnackbar(response?.response?.data?.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRowDataOnEditClick = (data) => {
    setEditTeamData(data);
  };

  useEffect(() => {
    getAllTeams();
  }, [currentPage || teams]);

  return (
    <>
      <UserLayout>
        <main id="main" className="main">
          <div className="pagetitle">
            <h1>Teams</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/teams">Teams</Link>
                </li>
                <li className="breadcrumb-item active">Lists</li>
              </ol>
            </nav>
          </div>
          <section className="section dashboard">
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="employees">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-start justify-content-between mb-3">
                          <h5 className="card-title">Teams</h5>
                          <button
                            className="btn btn-primary btn-sm mt-3"
                            data-bs-toggle="modal"
                            data-bs-target="#teamAddModalForm"
                          >
                            Add New Team
                          </button>
                        </div>
                        <div className="table-reponsive">
                          <Table
                            fields={fields}
                            data={teams}
                            currentPage={currentPage}
                            itemsPerPage={pageSize}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                            deleteData={deleteTeam}
                            editLink={"/admin/employee/edit"}
                            showViewButton={false}
                            editModalButton={true}
                            editModalButtonId={"teamEditModalForm"}
                            handleRowDataOnEditClick={handleRowDataOnEditClick}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <AddModal
            modalId={"teamAddModalForm"}
            createItem={createTeam}
            loading={loading}
          >
            {addModalForm()}
          </AddModal>
          <EditModal
            editModalId={"teamEditModalForm"}
            editItem={editTeam}
            loading={loading}
          >
            {editModalForm()}
          </EditModal>
        </main>
      </UserLayout>
    </>
  );
};

export default Team;
