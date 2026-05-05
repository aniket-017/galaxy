import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiChevronDown, FiChevronUp, FiPlus } from "react-icons/fi";
import "./AdminDashboard.css";
import Loading from "../components/Loading";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  // Carousel state
  const [carouselSlides, setCarouselSlides] = useState([]);
  const [carouselLoading, setCarouselLoading] = useState(false);
  const [showCarouselModal, setShowCarouselModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [slideForm, setSlideForm] = useState({
    imageUrl: "",
    title: "",
    subtitle: "",
    order: 1,
  });
  const [deleteSlideId, setDeleteSlideId] = useState(null);
  const [carouselReorderBusy, setCarouselReorderBusy] = useState(false);
  const [carouselSlideSaving, setCarouselSlideSaving] = useState(false);

  // Team state
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberForm, setMemberForm] = useState({
    name: "",
    position: "",
    photoUrl: "",
    description: "",
    email: "",
    phone: "",
    department: "Other",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
    order: 1,
  });
  const [deleteMemberId, setDeleteMemberId] = useState(null);
  const [teamReorderBusy, setTeamReorderBusy] = useState(false);
  const [teamMemberSaving, setTeamMemberSaving] = useState(false);

  // Career Photos state
  const [careerPhotos, setCareerPhotos] = useState([]);
  const [careerPhotosLoading, setCareerPhotosLoading] = useState(false);
  const [showCareerPhotosModal, setShowCareerPhotosModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [photoForm, setPhotoForm] = useState({
    imageUrl: "",
    title: "",
    description: "",
    order: 1,
  });
  const [deletePhotoId, setDeletePhotoId] = useState(null);
  const [careerReorderBusy, setCareerReorderBusy] = useState(false);
  const [careerPhotoSaving, setCareerPhotoSaving] = useState(false);

  // Leadership state
  const [leadership, setLeadership] = useState([]);
  const [leadershipLoading, setLeadershipLoading] = useState(false);
  const [showLeadershipModal, setShowLeadershipModal] = useState(false);
  const [editingLeader, setEditingLeader] = useState(null);
  const [leaderForm, setLeaderForm] = useState({
    role: "Chairman",
    name: "",
    photoUrl: "",
    title: "",
    message: "",
    signature: "",
  });
  const [deleteLeaderId, setDeleteLeaderId] = useState(null);

  // File Upload states
  const [slideFile, setSlideFile] = useState(null);
  const [slidePreview, setSlidePreview] = useState("");
  const [memberFile, setMemberFile] = useState(null);
  const [memberPreview, setMemberPreview] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [leaderFile, setLeaderFile] = useState(null);
  const [leaderPreview, setLeaderPreview] = useState("");

  // Job Applications state
  const [jobApplications, setJobApplications] = useState([]);
  const [jobApplicationsLoading, setJobApplicationsLoading] = useState(false);
  const [showJobApplicationModal, setShowJobApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationFilters, setApplicationFilters] = useState({
    status: "all",
    designation: "all",
  });
  const [applicationStats, setApplicationStats] = useState(null);
  const [deleteApplicationId, setDeleteApplicationId] = useState(null);

  // Contact Us state
  const [contacts, setContacts] = useState({ offices: [], emails: [] });
  const [contactLoading, setContactLoading] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contactForm, setContactForm] = useState({
    type: "office",
    officeName: "",
    address: "",
    pinCode: "",
    contactPerson: "",
    phone: "",
    telephone: "",
    queryType: "marketing",
    email: "",
    order: 1,
  });
  const [deleteContactId, setDeleteContactId] = useState(null);

  // Client logos (Our Clients page)
  const [clientLogos, setClientLogos] = useState([]);
  const [clientLogosLoading, setClientLogosLoading] = useState(false);
  const [showClientLogoModal, setShowClientLogoModal] = useState(false);
  const [editingClientLogo, setEditingClientLogo] = useState(null);
  const [clientLogoForm, setClientLogoForm] = useState({
    imageUrl: "",
    name: "",
    order: 1,
  });
  const [clientLogoFile, setClientLogoFile] = useState(null);
  const [clientLogoPreview, setClientLogoPreview] = useState("");
  const [deleteClientLogoId, setDeleteClientLogoId] = useState(null);
  const [clientLogoSaving, setClientLogoSaving] = useState(false);
  const [clientLogoReorderBusy, setClientLogoReorderBusy] = useState(false);

  const [stats, setStats] = useState({
    totalProjects: 0,
    industrialProjects: 0,
    infrastructureProjects: 0,
    specialAssignments: 0,
    multistoredBuildings: 0,
  });

  useEffect(() => {
    fetchProjects();
    fetchCarouselSlides();
    fetchTeamMembers();
    fetchCareerPhotos();
    fetchLeadership();
    fetchJobApplications();
    fetchApplicationStats();
    fetchContacts();
    fetchClientLogos();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/aak/l1/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        const projectsData = response.data.projects;
        setProjects(projectsData);

        // Calculate statistics
        const stats = {
          totalProjects: projectsData.length,
          industrialProjects: projectsData.filter((p) => p.category === "industrial").length,
          infrastructureProjects: projectsData.filter((p) => p.category === "infrastructure").length,
          specialAssignments: projectsData.filter((p) => p.category === "specialAssignments").length,
          multistoredBuildings: projectsData.filter((p) => p.category === "multistoredBuildings").length,
        };
        setStats(stats);
      }
    } catch (error) {
      setError("Failed to fetch projects");
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCarouselSlides = async () => {
    try {
      setCarouselLoading(true);
      const response = await axios.get("/aak/l1/admin/carousel", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setCarouselSlides(response.data.slides);
      }
    } catch (error) {
      setError("Failed to fetch carousel slides");
      console.error("Error fetching carousel slides:", error);
    } finally {
      setCarouselLoading(false);
    }
  };

  const fetchClientLogos = async () => {
    try {
      setClientLogosLoading(true);
      const response = await axios.get("/aak/l1/admin/client-logos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setClientLogos(response.data.logos);
      }
    } catch (error) {
      setError("Failed to fetch client logos");
      console.error("Error fetching client logos:", error);
    } finally {
      setClientLogosLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      setTeamLoading(true);
      const response = await axios.get("/aak/l1/admin/team", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setTeamMembers(response.data.members);
      }
    } catch (error) {
      setError("Failed to fetch team members");
      console.error("Error fetching team members:", error);
    } finally {
      setTeamLoading(false);
    }
  };

  const fetchCareerPhotos = async () => {
    try {
      setCareerPhotosLoading(true);
      const response = await axios.get("/aak/l1/admin/career-photos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setCareerPhotos(response.data.photos);
      }
    } catch (error) {
      setError("Failed to fetch career photos");
      console.error("Error fetching career photos:", error);
    } finally {
      setCareerPhotosLoading(false);
    }
  };

  const fetchLeadership = async () => {
    try {
      setLeadershipLoading(true);
      const response = await axios.get("/aak/l1/admin/leadership", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setLeadership(response.data.leaders);
      }
    } catch (error) {
      setError("Failed to fetch leadership messages");
      console.error("Error fetching leadership:", error);
    } finally {
      setLeadershipLoading(false);
    }
  };

  const fetchJobApplications = async () => {
    try {
      setJobApplicationsLoading(true);
      const { status, designation } = applicationFilters;
      const params = new URLSearchParams();
      if (status !== "all") params.append("status", status);
      if (designation !== "all") params.append("designation", designation);

      const response = await axios.get(`/aak/l1/admin/job-applications?${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setJobApplications(response.data.applications);
      }
    } catch (error) {
      setError("Failed to fetch job applications");
      console.error("Error fetching job applications:", error);
    } finally {
      setJobApplicationsLoading(false);
    }
  };

  const fetchApplicationStats = async () => {
    try {
      const response = await axios.get("/aak/l1/admin/job-applications/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setApplicationStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching application stats:", error);
    }
  };

  const handleEdit = (project) => {
    navigate(`/projects/edit/${project._id}`);
  };

  const handleDelete = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`/aak/l1/project/${selectedProject._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setProjects(projects.filter((p) => p._id !== selectedProject._id));
        setShowDeleteModal(false);
        setSelectedProject(null);
        fetchProjects(); // Refresh stats
      }
    } catch (error) {
      setError("Failed to delete project");
      console.error("Error deleting project:", error);
    }
  };

  // Carousel Management Functions
  const handleAddSlide = () => {
    setEditingSlide(null);
    setSlideForm({
      imageUrl: "",
      title: "",
      subtitle: "",
      order: carouselSlides.length + 1,
    });
    setSlideFile(null);
    setSlidePreview("");
    setCarouselSlideSaving(false);
    setShowCarouselModal(true);
  };

  const handleEditSlide = (slide) => {
    setEditingSlide(slide);
    setSlideForm({
      imageUrl: slide.imageUrl,
      title: slide.title,
      subtitle: slide.subtitle,
      order: slide.order,
    });
    setSlideFile(null);
    setSlidePreview(slide.imageUrl);
    setCarouselSlideSaving(false);
    setShowCarouselModal(true);
  };

  const handleSlideFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSlideFile(file);
      const reader = new FileReader();
      reader.onload = () => setSlidePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSlideFormSubmit = async (e) => {
    e.preventDefault();
    if (carouselSlideSaving) return;
    setCarouselSlideSaving(true);
    try {
      const myForm = new FormData();
      myForm.set("title", slideForm.title);
      myForm.set("subtitle", slideForm.subtitle);
      myForm.set("order", slideForm.order);

      if (slideFile) {
        myForm.set("image", slideFile);
      } else {
        myForm.set("imageUrl", slideForm.imageUrl);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingSlide) {
        await axios.put(`/aak/l1/admin/carousel/${editingSlide._id}`, myForm, config);
      } else {
        await axios.post("/aak/l1/admin/carousel", myForm, config);
      }

      setShowCarouselModal(false);
      fetchCarouselSlides();
      setError("");
    } catch (error) {
      setError(`Failed to ${editingSlide ? "update" : "create"} carousel slide`);
      console.error("Error saving carousel slide:", error);
    } finally {
      setCarouselSlideSaving(false);
    }
  };

  const handleDeleteSlide = async (slideId) => {
    try {
      await axios.delete(`/aak/l1/admin/carousel/${slideId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCarouselSlides();
      setDeleteSlideId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete carousel slide");
      console.error("Error deleting carousel slide:", error);
    }
  };

  const handleMoveSlide = async (slideId, direction) => {
    if (carouselReorderBusy) return;

    const sorted = [...carouselSlides].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((s) => String(s._id) === String(slideId));
    if (idx === -1) return;

    const j = direction === "up" ? idx - 1 : idx + 1;
    if (j < 0 || j >= sorted.length) return;

    const swapped = [...sorted];
    [swapped[idx], swapped[j]] = [swapped[j], swapped[idx]];
    const payload = swapped.map((s, i) => ({ id: s._id, order: i + 1 }));

    setCarouselReorderBusy(true);
    try {
      await axios.put(
        "/aak/l1/admin/carousel/reorder",
        { slides: payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchCarouselSlides();
      setError("");
    } catch (error) {
      setError("Failed to reorder carousel slide");
      console.error("Error reordering carousel slide:", error);
    } finally {
      setCarouselReorderBusy(false);
    }
  };

  // Client logos (public Our Clients page)
  const handleAddClientLogo = () => {
    setEditingClientLogo(null);
    setClientLogoForm({
      imageUrl: "",
      name: "",
      order: clientLogos.length + 1,
    });
    setClientLogoFile(null);
    setClientLogoPreview("");
    setClientLogoSaving(false);
    setShowClientLogoModal(true);
  };

  const handleEditClientLogo = (logo) => {
    setEditingClientLogo(logo);
    setClientLogoForm({
      imageUrl: logo.imageUrl,
      name: logo.name || "",
      order: logo.order,
    });
    setClientLogoFile(null);
    setClientLogoPreview(logo.imageUrl);
    setClientLogoSaving(false);
    setShowClientLogoModal(true);
  };

  const handleClientLogoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setClientLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => setClientLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClientLogoFormSubmit = async (e) => {
    e.preventDefault();
    if (clientLogoSaving) return;
    setClientLogoSaving(true);
    try {
      const myForm = new FormData();
      myForm.set("name", clientLogoForm.name || "");
      myForm.set("order", clientLogoForm.order);

      if (clientLogoFile) {
        myForm.set("image", clientLogoFile);
      } else {
        myForm.set("imageUrl", clientLogoForm.imageUrl);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingClientLogo) {
        await axios.put(`/aak/l1/admin/client-logos/${editingClientLogo._id}`, myForm, config);
      } else {
        await axios.post("/aak/l1/admin/client-logos", myForm, config);
      }

      setShowClientLogoModal(false);
      fetchClientLogos();
      setError("");
    } catch (error) {
      setError(`Failed to ${editingClientLogo ? "update" : "add"} client logo`);
      console.error("Error saving client logo:", error);
    } finally {
      setClientLogoSaving(false);
    }
  };

  const handleDeleteClientLogo = async (logoId) => {
    try {
      await axios.delete(`/aak/l1/admin/client-logos/${logoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchClientLogos();
      setDeleteClientLogoId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete client logo");
      console.error("Error deleting client logo:", error);
    }
  };

  const handleMoveClientLogo = async (logoId, direction) => {
    if (clientLogoReorderBusy) return;

    const sorted = [...clientLogos].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((l) => String(l._id) === String(logoId));
    if (idx === -1) return;

    const j = direction === "up" ? idx - 1 : idx + 1;
    if (j < 0 || j >= sorted.length) return;

    const swapped = [...sorted];
    [swapped[idx], swapped[j]] = [swapped[j], swapped[idx]];
    const payload = swapped.map((l, i) => ({ id: l._id, order: i + 1 }));

    setClientLogoReorderBusy(true);
    try {
      await axios.put(
        "/aak/l1/admin/client-logos/reorder",
        { logos: payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchClientLogos();
      setError("");
    } catch (error) {
      setError("Failed to reorder client logo");
      console.error("Error reordering client logo:", error);
    } finally {
      setClientLogoReorderBusy(false);
    }
  };

  // Team Management Functions
  const handleAddMember = () => {
    setEditingMember(null);
    setMemberForm({
      name: "",
      position: "",
      photoUrl: "",
      description: "",
      email: "",
      phone: "",
      department: "Other",
      socialLinks: {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",
      },
      order: teamMembers.length + 1,
    });
    setMemberFile(null);
    setMemberPreview("");
    setTeamMemberSaving(false);
    setShowTeamModal(true);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setMemberForm({
      name: member.name,
      position: member.position,
      photoUrl: member.photoUrl,
      description: member.description || "",
      email: member.email || "",
      phone: member.phone || "",
      department: member.department || "Other",
      socialLinks: member.socialLinks || {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",
      },
      order: member.order,
    });
    setMemberFile(null);
    setMemberPreview(member.photoUrl);
    setTeamMemberSaving(false);
    setShowTeamModal(true);
  };

  const handleMemberFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMemberFile(file);
      const reader = new FileReader();
      reader.onload = () => setMemberPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMemberFormSubmit = async (e) => {
    e.preventDefault();
    if (teamMemberSaving) return;
    setTeamMemberSaving(true);
    try {
      const myForm = new FormData();
      myForm.set("name", memberForm.name);
      myForm.set("position", memberForm.position);
      myForm.set("description", memberForm.description);
      myForm.set("email", memberForm.email);
      myForm.set("phone", memberForm.phone);
      myForm.set("department", memberForm.department);
      myForm.set("order", memberForm.order);
      myForm.set("socialLinks", JSON.stringify(memberForm.socialLinks));

      if (memberFile) {
        myForm.set("photo", memberFile);
      } else {
        myForm.set("photoUrl", memberForm.photoUrl);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingMember) {
        await axios.put(`/aak/l1/admin/team/${editingMember._id}`, myForm, config);
      } else {
        await axios.post("/aak/l1/admin/team", myForm, config);
      }

      setShowTeamModal(false);
      fetchTeamMembers();
      setError("");
    } catch (error) {
      setError(`Failed to ${editingMember ? "update" : "create"} team member`);
      console.error("Error saving team member:", error);
    } finally {
      setTeamMemberSaving(false);
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await axios.delete(`/aak/l1/admin/team/${memberId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTeamMembers();
      setDeleteMemberId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete team member");
      console.error("Error deleting team member:", error);
    }
  };

  const handleMoveMember = async (memberId, direction) => {
    if (teamReorderBusy) return;

    const sorted = [...teamMembers].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((m) => String(m._id) === String(memberId));
    if (idx === -1) return;

    const j = direction === "up" ? idx - 1 : idx + 1;
    if (j < 0 || j >= sorted.length) return;

    const swapped = [...sorted];
    [swapped[idx], swapped[j]] = [swapped[j], swapped[idx]];
    const payload = swapped.map((m, i) => ({ id: m._id, order: i + 1 }));

    setTeamReorderBusy(true);
    try {
      await axios.put(
        "/aak/l1/admin/team/reorder",
        { members: payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchTeamMembers();
      setError("");
    } catch (error) {
      setError("Failed to reorder team member");
      console.error("Error reordering team member:", error);
    } finally {
      setTeamReorderBusy(false);
    }
  };

  // Career Photos Management Functions
  const handleAddPhoto = () => {
    setEditingPhoto(null);
    setPhotoForm({
      imageUrl: "",
      title: "",
      description: "",
      order: careerPhotos.length + 1,
    });
    setPhotoFile(null);
    setPhotoPreview("");
    setCareerPhotoSaving(false);
    setShowCareerPhotosModal(true);
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setPhotoForm({
      imageUrl: photo.imageUrl,
      title: photo.title,
      description: photo.description || "",
      order: photo.order,
    });
    setPhotoFile(null);
    setPhotoPreview(photo.imageUrl);
    setCareerPhotoSaving(false);
    setShowCareerPhotosModal(true);
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoFormSubmit = async (e) => {
    e.preventDefault();
    if (careerPhotoSaving) return;
    setCareerPhotoSaving(true);
    try {
      const myForm = new FormData();
      myForm.set("title", photoForm.title);
      myForm.set("description", photoForm.description);
      myForm.set("order", photoForm.order);

      if (photoFile) {
        myForm.set("image", photoFile);
      } else {
        myForm.set("imageUrl", photoForm.imageUrl);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingPhoto) {
        await axios.put(`/aak/l1/admin/career-photos/${editingPhoto._id}`, myForm, config);
      } else {
        await axios.post("/aak/l1/admin/career-photos", myForm, config);
      }

      setShowCareerPhotosModal(false);
      fetchCareerPhotos();
      setError("");
    } catch (error) {
      setError(`Failed to ${editingPhoto ? "update" : "create"} career photo`);
      console.error("Error saving career photo:", error);
    } finally {
      setCareerPhotoSaving(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await axios.delete(`/aak/l1/admin/career-photos/${photoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCareerPhotos();
      setDeletePhotoId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete career photo");
      console.error("Error deleting career photo:", error);
    }
  };

  const handleMovePhoto = async (photoId, direction) => {
    if (careerReorderBusy) return;

    const sorted = [...careerPhotos].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((p) => String(p._id) === String(photoId));
    if (idx === -1) return;

    const j = direction === "up" ? idx - 1 : idx + 1;
    if (j < 0 || j >= sorted.length) return;

    const swapped = [...sorted];
    [swapped[idx], swapped[j]] = [swapped[j], swapped[idx]];
    const payload = swapped.map((p, i) => ({ id: p._id, order: i + 1 }));

    setCareerReorderBusy(true);
    try {
      await axios.put(
        "/aak/l1/admin/career-photos/reorder",
        { photos: payload },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchCareerPhotos();
      setError("");
    } catch (error) {
      setError("Failed to reorder career photo");
      console.error("Error reordering career photo:", error);
    } finally {
      setCareerReorderBusy(false);
    }
  };

  // Leadership Management Functions
  const handleAddLeader = () => {
    setEditingLeader(null);
    setLeaderForm({
      role: "Chairman",
      name: "",
      photoUrl: "",
      title: "",
      message: "",
      signature: "",
    });
    setLeaderFile(null);
    setLeaderPreview("");
    setShowLeadershipModal(true);
  };

  const handleEditLeader = (leader) => {
    setEditingLeader(leader);
    setLeaderForm({
      role: leader.role,
      name: leader.name,
      photoUrl: leader.photoUrl,
      title: leader.title || "",
      message: leader.message,
      signature: leader.signature || "",
    });
    setLeaderFile(null);
    setLeaderPreview(leader.photoUrl);
    setShowLeadershipModal(true);
  };

  const handleLeaderFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLeaderFile(file);
      const reader = new FileReader();
      reader.onload = () => setLeaderPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLeaderFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const myForm = new FormData();
      myForm.set("role", leaderForm.role);
      myForm.set("name", leaderForm.name);
      myForm.set("title", leaderForm.title);
      myForm.set("message", leaderForm.message);
      myForm.set("signature", leaderForm.signature);
      
      if (leaderFile) {
        myForm.set("photo", leaderFile);
      } else {
        myForm.set("photoUrl", leaderForm.photoUrl);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingLeader) {
        await axios.put(`/aak/l1/admin/leadership/${editingLeader._id}`, myForm, config);
      } else {
        await axios.post("/aak/l1/admin/leadership", myForm, config);
      }

      setShowLeadershipModal(false);
      fetchLeadership();
      setError("");
    } catch (error) {
      setError(`Failed to ${editingLeader ? "update" : "create"} leadership message`);
      console.error("Error saving leadership:", error);
    }
  };

  const handleDeleteLeader = async (leaderId) => {
    try {
      await axios.delete(`/aak/l1/admin/leadership/${leaderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchLeadership();
      setDeleteLeaderId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete leadership message");
      console.error("Error deleting leadership:", error);
    }
  };

  // Job Applications Management Functions
  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowJobApplicationModal(true);
  };

  const handleUpdateApplicationStatus = async (applicationId, status, notes = "") => {
    try {
      const response = await axios.put(
        `/aak/l1/admin/job-applications/${applicationId}`,
        {
          status,
          notes,
          reviewedBy: "Admin", // You can get actual admin name from auth context
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        fetchJobApplications();
        fetchApplicationStats();
        setShowJobApplicationModal(false);
        setError("");
      }
    } catch (error) {
      setError("Failed to update application status");
      console.error("Error updating application:", error);
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    try {
      await axios.delete(`/aak/l1/admin/job-applications/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchJobApplications();
      fetchApplicationStats();
      setDeleteApplicationId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete job application");
      console.error("Error deleting application:", error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "under_review":
        return "status-under-review";
      case "shortlisted":
        return "status-shortlisted";
      case "rejected":
        return "status-rejected";
      case "hired":
        return "status-hired";
      default:
        return "status-pending";
    }
  };

  const formatStatus = (status) => {
    return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Contact Us Management Functions
  const fetchContacts = async () => {
    try {
      setContactLoading(true);
      const response = await axios.get("/aak/l1/admin/contact", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setContacts({
          offices: response.data.offices || [],
          emails: response.data.emails || [],
        });
      }
    } catch (error) {
      setError("Failed to fetch contacts");
      console.error("Error fetching contacts:", error);
    } finally {
      setContactLoading(false);
    }
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setContactForm({
      type: "office",
      officeName: "",
      address: "",
      pinCode: "",
      contactPerson: "",
      phone: "",
      telephone: "",
      queryType: "marketing",
      email: "",
      order: contacts.offices.length + contacts.emails.length + 1,
    });
    setShowContactModal(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setContactForm({
      type: contact.type,
      officeName: contact.officeName || "",
      address: contact.address || "",
      pinCode: contact.pinCode || "",
      contactPerson: contact.contactPerson || "",
      phone: contact.phone || "",
      telephone: contact.telephone || "",
      queryType: contact.queryType || "marketing",
      email: contact.email || "",
      order: contact.order || 1,
    });
    setShowContactModal(true);
  };

  const handleContactFormSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };

      if (editingContact) {
        // Update existing contact
        await axios.put(`/aak/l1/admin/contact/${editingContact._id}`, contactForm, config);
      } else {
        // Create new contact
        await axios.post("/aak/l1/admin/contact", contactForm, config);
      }

      setShowContactModal(false);
      fetchContacts();
      setError("");
    } catch (error) {
      setError(`Failed to ${editingContact ? "update" : "create"} contact`);
      console.error("Error saving contact:", error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`/aak/l1/admin/contact/${contactId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchContacts();
      setDeleteContactId(null);
      setError("");
    } catch (error) {
      setError("Failed to delete contact");
      console.error("Error deleting contact:", error);
    }
  };

  const getQueryTypeLabel = (type) => {
    const labels = {
      marketing: "Marketing",
      purchase: "Purchase",
      hr: "HR",
      recruitment: "Recruitment",
    };
    return labels[type] || type;
  };

  const handleAddNew = () => {
    navigate("/projects/add");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return <Loading message="Loading dashboard..." fullScreen={true} />;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
          <p className="welcome-text">Welcome back, {JSON.parse(localStorage.getItem("user"))?.name || "Admin"}</p>
        </div>
        <div className="header-right">
          <button className="add-project-btn" onClick={handleAddNew}>
            <i className="fas fa-plus"></i> Add New Project
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          <i className="fas fa-project-diagram"></i> Projects
        </button>
        <button
          className={`tab-btn ${activeTab === "carousel" ? "active" : ""}`}
          onClick={() => setActiveTab("carousel")}
        >
          <i className="fas fa-images"></i> Carousel Management
        </button>
        <button
          className={`tab-btn ${activeTab === "clients" ? "active" : ""}`}
          onClick={() => setActiveTab("clients")}
        >
          <i className="fas fa-building"></i> Clients
        </button>
        <button className={`tab-btn ${activeTab === "team" ? "active" : ""}`} onClick={() => setActiveTab("team")}>
          <i className="fas fa-users"></i> Team Management
        </button>
        <button
          className={`tab-btn ${activeTab === "career-photos" ? "active" : ""}`}
          onClick={() => setActiveTab("career-photos")}
        >
          <i className="fas fa-camera"></i> Career Photos
        </button>
        <button
          className={`tab-btn ${activeTab === "leadership" ? "active" : ""}`}
          onClick={() => setActiveTab("leadership")}
        >
          <i className="fas fa-user-tie"></i> Leadership
        </button>
        <button
          className={`tab-btn ${activeTab === "job-applications" ? "active" : ""}`}
          onClick={() => setActiveTab("job-applications")}
        >
          <i className="fas fa-file-alt"></i> Job Applications
        </button>
        <button
          className={`tab-btn ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          <i className="fas fa-address-book"></i> Contact Us
        </button>
      </div>

      {activeTab === "projects" && (
        <>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p className="stat-number">{stats.totalProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Industrial</h3>
          <p className="stat-number">{stats.industrialProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Infrastructure</h3>
          <p className="stat-number">{stats.infrastructureProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Special Assignments</h3>
          <p className="stat-number">{stats.specialAssignments}</p>
        </div>
        <div className="stat-card">
          <h3>Multistored Buildings</h3>
          <p className="stat-number">{stats.multistoredBuildings}</p>
        </div>
      </div>

      <div className="projects-section">
        <div className="section-header">
          <h2>All Projects</h2>
          <div className="search-box">
            <input type="text" placeholder="Search projects..." />
            <i className="fas fa-search"></i>
          </div>
        </div>

        <div className="projects-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <div className="project-title">
                      {project.images[0] && (
                        <img src={project.images[0]} alt={project.title} className="project-thumbnail" />
                      )}
                      <span>{project.title}</span>
                    </div>
                  </td>
                  <td>{project.category}</td>
                  <td>{project.subcategory}</td>
                  <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => handleEdit(project)}>
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(project)}>
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

      {activeTab === "carousel" && (
        <div className="carousel-section admin-managed-section">
          <div className="section-header">
            <h2>Carousel Management</h2>
            <button
              type="button"
              className="add-slide-btn add-client-logo-btn"
              disabled={carouselSlideSaving || carouselReorderBusy}
              onClick={handleAddSlide}
            >
              <FiPlus size={18} strokeWidth={2.5} aria-hidden /> Add New Slide
            </button>
          </div>

          {carouselLoading ? (
            <div className="admin-panel-loading" role="status">
              <span className="admin-spinner admin-spinner--lg" aria-hidden />
              Loading carousel slides…
            </div>
          ) : (
            <div className="admin-reorder-table-wrap">
              {carouselReorderBusy && (
                <div className="admin-reorder-busy-overlay" role="status" aria-live="polite">
                  <span className="admin-spinner admin-spinner--lg" aria-hidden />
                  <span>Updating order…</span>
                </div>
              )}
              <div className={`carousel-table ${carouselReorderBusy ? "admin-reorder-table--dimmed" : ""}`}>
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Subtitle</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carouselSlides.map((slide) => (
                      <tr key={slide._id}>
                        <td>
                          <div className="order-controls">
                            <span className="order-number">{slide.order}</span>
                            <div className="order-buttons admin-order-buttons">
                              <button
                                type="button"
                                className="order-btn admin-order-btn"
                                onClick={() => handleMoveSlide(slide._id, "up")}
                                disabled={carouselReorderBusy || slide.order === 1}
                                title="Move up"
                              >
                                <FiChevronUp size={20} strokeWidth={2.5} aria-hidden />
                              </button>
                              <button
                                type="button"
                                className="order-btn admin-order-btn"
                                onClick={() => handleMoveSlide(slide._id, "down")}
                                disabled={carouselReorderBusy || slide.order === carouselSlides.length}
                                title="Move down"
                              >
                                <FiChevronDown size={20} strokeWidth={2.5} aria-hidden />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <img src={slide.imageUrl} alt={slide.title} className="slide-thumbnail" />
                        </td>
                        <td>{slide.title}</td>
                        <td>{slide.subtitle}</td>
                        <td className="actions">
                          <button type="button" className="edit-btn" onClick={() => handleEditSlide(slide)}>
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button type="button" className="delete-btn" onClick={() => setDeleteSlideId(slide._id)}>
                            <i className="fas fa-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "clients" && (
        <div className="carousel-section admin-managed-section">
          <div className="section-header">
            <div>
              <h2>Client Logos</h2>
              <p style={{ margin: "0.35rem 0 0", color: "#555", fontSize: "0.9rem", maxWidth: "42rem" }}>
                Position 1 appears first on the Our Clients page. Use the arrows to reorder, or set a number when adding or
                editing.
              </p>
            </div>
            <button
              type="button"
              className="add-slide-btn add-client-logo-btn"
              disabled={clientLogoSaving || clientLogoReorderBusy}
              onClick={handleAddClientLogo}
            >
              <FiPlus size={18} strokeWidth={2.5} aria-hidden /> Add Client Logo
            </button>
          </div>

          {clientLogosLoading ? (
            <div className="admin-panel-loading" role="status">
              <span className="admin-spinner admin-spinner--lg" aria-hidden />
              Loading client logos…
            </div>
          ) : (
            <div className="admin-reorder-table-wrap">
              {clientLogoReorderBusy && (
                <div className="admin-reorder-busy-overlay" role="status" aria-live="polite">
                  <span className="admin-spinner admin-spinner--lg" aria-hidden />
                  <span>Updating order…</span>
                </div>
              )}
              <div className={`carousel-table ${clientLogoReorderBusy ? "admin-reorder-table--dimmed" : ""}`}>
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Logo</th>
                    <th>Name (optional)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clientLogos.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                        No logos yet. Click &quot;Add Client Logo&quot; to upload one.
                      </td>
                    </tr>
                  ) : (
                    clientLogos.map((logo) => (
                      <tr key={logo._id}>
                        <td>
                          <div className="order-controls">
                            <span className="order-number">{logo.order}</span>
                            <div className="order-buttons admin-order-buttons">
                              <button
                                type="button"
                                className="order-btn admin-order-btn"
                                onClick={() => handleMoveClientLogo(logo._id, "up")}
                                disabled={clientLogoReorderBusy || logo.order === 1}
                                title="Move up"
                              >
                                <FiChevronUp size={20} strokeWidth={2.5} aria-hidden />
                              </button>
                              <button
                                type="button"
                                className="order-btn admin-order-btn"
                                onClick={() => handleMoveClientLogo(logo._id, "down")}
                                disabled={clientLogoReorderBusy || logo.order === clientLogos.length}
                                title="Move down"
                              >
                                <FiChevronDown size={20} strokeWidth={2.5} aria-hidden />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <img src={logo.imageUrl} alt={logo.name || "Client"} className="slide-thumbnail" />
                        </td>
                        <td>{logo.name || "—"}</td>
                        <td className="actions">
                          <button type="button" className="edit-btn" onClick={() => handleEditClientLogo(logo)}>
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button type="button" className="delete-btn" onClick={() => setDeleteClientLogoId(logo._id)}>
                            <i className="fas fa-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "team" && (
        <div className="carousel-section team-section admin-managed-section">
          <div className="section-header">
            <h2>Team Management</h2>
            <button
              type="button"
              className="add-member-btn add-client-logo-btn"
              disabled={teamMemberSaving || teamReorderBusy}
              onClick={handleAddMember}
            >
              <FiPlus size={18} strokeWidth={2.5} aria-hidden /> Add New Member
            </button>
          </div>

          {teamLoading ? (
            <div className="admin-panel-loading" role="status">
              <span className="admin-spinner admin-spinner--lg" aria-hidden />
              Loading team members…
            </div>
          ) : (
            <div className="admin-reorder-table-wrap">
              {teamReorderBusy && (
                <div className="admin-reorder-busy-overlay" role="status" aria-live="polite">
                  <span className="admin-spinner admin-spinner--lg" aria-hidden />
                  <span>Updating order…</span>
                </div>
              )}
              <div className={`team-table ${teamReorderBusy ? "admin-reorder-table--dimmed" : ""}`}>
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Department</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member._id}>
                        <td>
                          <div className="order-controls">
                            <span className="order-number">{member.order}</span>
                            <div className="order-buttons admin-order-buttons">
                              <button
                                type="button"
                                className="order-btn admin-order-btn"
                                onClick={() => handleMoveMember(member._id, "up")}
                                disabled={teamReorderBusy || member.order === 1}
                                title="Move up"
                              >
                                <FiChevronUp size={20} strokeWidth={2.5} aria-hidden />
                              </button>
                              <button
                                type="button"
                                className="order-btn admin-order-btn"
                                onClick={() => handleMoveMember(member._id, "down")}
                                disabled={teamReorderBusy || member.order === teamMembers.length}
                                title="Move down"
                              >
                                <FiChevronDown size={20} strokeWidth={2.5} aria-hidden />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <img src={member.photoUrl} alt={member.name} className="member-thumbnail" />
                        </td>
                        <td>{member.name}</td>
                        <td>{member.position}</td>
                        <td>{member.department}</td>
                        <td className="actions">
                          <button type="button" className="edit-btn" onClick={() => handleEditMember(member)}>
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button type="button" className="delete-btn" onClick={() => setDeleteMemberId(member._id)}>
                            <i className="fas fa-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "career-photos" && (
        <div className="carousel-section career-photos-section admin-managed-section">
          <div className="section-header">
            <h2>Career Photos Management</h2>
            <button
              type="button"
              className="add-photo-btn add-client-logo-btn"
              disabled={careerPhotoSaving || careerReorderBusy}
              onClick={handleAddPhoto}
            >
              <FiPlus size={18} strokeWidth={2.5} aria-hidden /> Add New Photo
            </button>
          </div>

          {careerPhotosLoading ? (
            <div className="admin-panel-loading" role="status">
              <span className="admin-spinner admin-spinner--lg" aria-hidden />
              Loading career photos…
            </div>
          ) : (
            <div className="admin-reorder-table-wrap">
              {careerReorderBusy && (
                <div className="admin-reorder-busy-overlay" role="status" aria-live="polite">
                  <span className="admin-spinner admin-spinner--lg" aria-hidden />
                  <span>Updating order…</span>
                </div>
              )}
              <div className={`career-photos-table ${careerReorderBusy ? "admin-reorder-table--dimmed" : ""}`}>
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careerPhotos.map((photo) => (
                      <tr key={photo._id}>
                        <td>
                          <div className="order-controls">
                            <span className="order-number">{photo.order}</span>
                            <div className="order-buttons admin-order-buttons">
                              <button
                                type="button"
                                className="order-btn admin-order-btn"
                                onClick={() => handleMovePhoto(photo._id, "up")}
                                disabled={careerReorderBusy || photo.order === 1}
                                title="Move up"
                              >
                                <FiChevronUp size={20} strokeWidth={2.5} aria-hidden />
                              </button>
                              <button
                                type="button"
                                className="order-btn admin-order-btn"
                                onClick={() => handleMovePhoto(photo._id, "down")}
                                disabled={careerReorderBusy || photo.order === careerPhotos.length}
                                title="Move down"
                              >
                                <FiChevronDown size={20} strokeWidth={2.5} aria-hidden />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <img src={photo.imageUrl} alt={photo.title} className="photo-thumbnail" />
                        </td>
                        <td>{photo.title}</td>
                        <td>{photo.description || "No description"}</td>
                        <td className="actions">
                          <button type="button" className="edit-btn" onClick={() => handleEditPhoto(photo)}>
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button type="button" className="delete-btn" onClick={() => setDeletePhotoId(photo._id)}>
                            <i className="fas fa-trash"></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "leadership" && (
        <div className="leadership-section">
          <div className="section-header">
            <h2>Leadership Management</h2>
            <button className="add-leader-btn" onClick={handleAddLeader}>
              <i className="fas fa-plus"></i> Add Leadership Message
            </button>
          </div>

          {leadershipLoading ? (
            <div className="loading">Loading leadership messages...</div>
          ) : (
            <div className="leadership-table">
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Message Preview</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leadership.map((leader) => (
                    <tr key={leader._id}>
                      <td>
                        <span className={`role-badge ${leader.role.toLowerCase()}`}>{leader.role}</span>
                      </td>
                      <td>
                        <img src={leader.photoUrl} alt={leader.name} className="leader-thumbnail" />
                      </td>
                      <td>{leader.name}</td>
                      <td>{leader.title || "N/A"}</td>
                      <td className="message-preview">{leader.message.substring(0, 100)}...</td>
                      <td className="actions">
                        <button className="edit-btn" onClick={() => handleEditLeader(leader)}>
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button className="delete-btn" onClick={() => setDeleteLeaderId(leader._id)}>
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {leadership.length === 0 && (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No leadership messages found. Add Chairman and Director messages.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Career Photos Modal */}
      {showCareerPhotosModal && (
        <div className={`modal-overlay${careerPhotoSaving ? " modal-overlay--saving" : ""}`}>
          <div className="modal-content career-photos-modal admin-form-modal">
            <h3>{editingPhoto ? "Edit Career Photo" : "Add New Career Photo"}</h3>
            <form onSubmit={handlePhotoFormSubmit}>
              <div className="form-group">
                <label>Upload Image:</label>
                <input type="file" accept="image/*" onChange={handlePhotoFileChange} />
              </div>
              <div className="separator">OR</div>
              <div className="form-group">
                <label>Image URL (Fallback):</label>
                <input
                  type="url"
                  value={photoForm.imageUrl}
                  onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  required
                  maxLength="100"
                />
              </div>
              <div className="form-group">
                <label>Description (Optional):</label>
                <textarea
                  value={photoForm.description}
                  onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                  maxLength="200"
                  rows="3"
                  placeholder="Brief description of the photo..."
                />
              </div>
              <div className="form-group">
                <label>Order:</label>
                <input
                  type="number"
                  value={photoForm.order}
                  onChange={(e) => setPhotoForm({ ...photoForm, order: parseInt(e.target.value) })}
                  min="1"
                  required
                />
              </div>
              {photoPreview && (
                <div className="image-preview">
                  <img src={photoPreview} alt="Preview" />
                </div>
              )}
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  disabled={careerPhotoSaving}
                  onClick={() => {
                    setShowCareerPhotosModal(false);
                    setCareerPhotoSaving(false);
                  }}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" className="save-btn save-btn--with-spinner" disabled={careerPhotoSaving}>
                  {careerPhotoSaving ? (
                    <>
                      <span className="admin-spinner admin-spinner--btn" aria-hidden />
                      Uploading…
                    </>
                  ) : (
                    <>{editingPhoto ? "Save changes" : "Add photo"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === "job-applications" && (
        <div className="job-applications-section">
          <div className="section-header">
            <h2>Job Applications Management</h2>
            <div className="application-filters">
              <select
                value={applicationFilters.status}
                onChange={(e) => {
                  setApplicationFilters({ ...applicationFilters, status: e.target.value });
                  fetchJobApplications();
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
              <select
                value={applicationFilters.designation}
                onChange={(e) => {
                  setApplicationFilters({ ...applicationFilters, designation: e.target.value });
                  fetchJobApplications();
                }}
              >
                <option value="all">All Positions</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Civil Engineer">Civil Engineer</option>
                <option value="Site Engineer">Site Engineer</option>
                {/* Add more as needed */}
              </select>
            </div>
          </div>

          {applicationStats && (
            <div className="application-stats">
              <div className="stat-card">
                <h3>{applicationStats.total}</h3>
                <p>Total Applications</p>
              </div>
              <div className="stat-card">
                <h3>{applicationStats.thisMonth}</h3>
                <p>This Month</p>
              </div>
              <div className="stat-card">
                <h3>{applicationStats.byStatus?.find((s) => s._id === "pending")?.count || 0}</h3>
                <p>Pending Review</p>
              </div>
              <div className="stat-card">
                <h3>{applicationStats.byStatus?.find((s) => s._id === "shortlisted")?.count || 0}</h3>
                <p>Shortlisted</p>
              </div>
            </div>
          )}

          {jobApplicationsLoading ? (
            <div className="loading">Loading job applications...</div>
          ) : (
            <div className="job-applications-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Experience</th>
                    <th>Status</th>
                    <th>Applied Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobApplications.map((application) => (
                    <tr key={application._id}>
                      <td>
                        <div className="applicant-info">
                          <strong>
                            {application.firstName} {application.lastName}
                          </strong>
                          <span className="email">{application.email}</span>
                        </div>
                      </td>
                      <td>{application.designation}</td>
                      <td>{application.experience}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                          {formatStatus(application.status)}
                        </span>
                      </td>
                      <td>{new Date(application.appliedDate).toLocaleDateString()}</td>
                      <td className="actions">
                        <button className="view-btn" onClick={() => handleViewApplication(application)}>
                          <i className="fas fa-eye"></i> View
                        </button>
                        <button className="delete-btn" onClick={() => setDeleteApplicationId(application._id)}>
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {jobApplications.length === 0 && (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No job applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Job Application Modal */}
      {showJobApplicationModal && selectedApplication && (
        <div className="modal-overlay">
          <div className="modal-content job-application-modal">
            <h3>Job Application Details</h3>
            <div className="application-details">
              <div className="applicant-header">
                <h4>
                  {selectedApplication.firstName} {selectedApplication.lastName}
                </h4>
                <span className={`status-badge ${getStatusBadgeClass(selectedApplication.status)}`}>
                  {formatStatus(selectedApplication.status)}
                </span>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{selectedApplication.email}</span>
                </div>
                <div className="detail-item">
                  <label>Phone:</label>
                  <span>
                    {selectedApplication.countryCode} {selectedApplication.phone}
                  </span>
                </div>
                <div className="detail-item">
                  <label>Position Applied:</label>
                  <span>{selectedApplication.designation}</span>
                </div>
                <div className="detail-item">
                  <label>Experience:</label>
                  <span>{selectedApplication.experience} years</span>
                </div>
                <div className="detail-item">
                  <label>Qualification:</label>
                  <span>{selectedApplication.qualification}</span>
                </div>
                <div className="detail-item">
                  <label>Location:</label>
                  <span>{selectedApplication.location}</span>
                </div>
                <div className="detail-item">
                  <label>Applied Date:</label>
                  <span>{new Date(selectedApplication.appliedDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <label>Resume:</label>
                  <a
                    href={selectedApplication.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-link"
                  >
                    📄 Download Resume
                  </a>
                </div>
              </div>

              {selectedApplication.notes && (
                <div className="notes-section">
                  <label>Notes:</label>
                  <p>{selectedApplication.notes}</p>
                </div>
              )}

              <div className="status-update">
                <h4>Update Status</h4>
                <div className="status-buttons">
                  <button
                    className="status-btn pending"
                    onClick={() => handleUpdateApplicationStatus(selectedApplication._id, "pending")}
                  >
                    Pending
                  </button>
                  <button
                    className="status-btn under-review"
                    onClick={() => handleUpdateApplicationStatus(selectedApplication._id, "under_review")}
                  >
                    Under Review
                  </button>
                  <button
                    className="status-btn shortlisted"
                    onClick={() => handleUpdateApplicationStatus(selectedApplication._id, "shortlisted")}
                  >
                    Shortlisted
                  </button>
                  <button
                    className="status-btn rejected"
                    onClick={() => handleUpdateApplicationStatus(selectedApplication._id, "rejected")}
                  >
                    Rejected
                  </button>
                  <button
                    className="status-btn hired"
                    onClick={() => handleUpdateApplicationStatus(selectedApplication._id, "hired")}
                  >
                    Hired
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowJobApplicationModal(false)}>
                <i className="fas fa-times"></i> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leadership Modal */}
      {showLeadershipModal && (
        <div className="modal-overlay">
          <div className="modal-content leadership-modal">
            <h3>{editingLeader ? "Edit Leadership Message" : "Add Leadership Message"}</h3>
            <form onSubmit={handleLeaderFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Role:</label>
                  <select
                    value={leaderForm.role}
                    onChange={(e) => setLeaderForm({ ...leaderForm, role: e.target.value })}
                    required
                    disabled={editingLeader} // Prevent changing role when editing
                  >
                    <option value="Chairman">Chairman</option>
                    <option value="Director">Director</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={leaderForm.name}
                    onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })}
                    required
                    maxLength="100"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Upload Photo:</label>
                <input type="file" accept="image/*" onChange={handleLeaderFileChange} />
              </div>
              <div className="separator">OR</div>
              <div className="form-group">
                <label>Photo URL (Fallback):</label>
                <input
                  type="url"
                  value={leaderForm.photoUrl}
                  onChange={(e) => setLeaderForm({ ...leaderForm, photoUrl: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              <div className="form-group">
                <label>Title (Optional):</label>
                <input
                  type="text"
                  value={leaderForm.title}
                  onChange={(e) => setLeaderForm({ ...leaderForm, title: e.target.value })}
                  maxLength="200"
                  placeholder="e.g., Founder & Chairman"
                />
              </div>
              <div className="form-group">
                <label>Message:</label>
                <textarea
                  value={leaderForm.message}
                  onChange={(e) => setLeaderForm({ ...leaderForm, message: e.target.value })}
                  required
                  rows="8"
                  placeholder="Enter the complete message content..."
                />
              </div>
              <div className="form-group">
                <label>Signature (Optional):</label>
                <textarea
                  value={leaderForm.signature}
                  onChange={(e) => setLeaderForm({ ...leaderForm, signature: e.target.value })}
                  rows="3"
                  maxLength="500"
                  placeholder="e.g., With best regards, [Name]"
                />
              </div>
              {leaderPreview && (
                <div className="image-preview">
                  <img src={leaderPreview} alt="Preview" />
                </div>
              )}
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowLeadershipModal(false)}>
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" className="save-btn">
                  <i className="fas fa-save"></i> {editingLeader ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Modal */}
      {showTeamModal && (
        <div className={`modal-overlay${teamMemberSaving ? " modal-overlay--saving" : ""}`}>
          <div className="modal-content team-modal admin-form-modal">
            <h3>{editingMember ? "Edit Team Member" : "Add New Team Member"}</h3>
            <form onSubmit={handleMemberFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    required
                    maxLength="100"
                  />
                </div>
                <div className="form-group">
                  <label>Position:</label>
                  <input
                    type="text"
                    value={memberForm.position}
                    onChange={(e) => setMemberForm({ ...memberForm, position: e.target.value })}
                    required
                    maxLength="150"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Upload Photo:</label>
                <input type="file" accept="image/*" onChange={handleMemberFileChange} />
              </div>
              <div className="separator">OR</div>
              <div className="form-group">
                <label>Photo URL (Fallback):</label>
                <input
                  type="url"
                  value={memberForm.photoUrl}
                  onChange={(e) => setMemberForm({ ...memberForm, photoUrl: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department:</label>
                  <select
                    value={memberForm.department}
                    onChange={(e) => setMemberForm({ ...memberForm, department: e.target.value })}
                  >
                    <option value="Management">Management</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Order:</label>
                  <input
                    type="number"
                    value={memberForm.order}
                    onChange={(e) => setMemberForm({ ...memberForm, order: parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={memberForm.description}
                  onChange={(e) => setMemberForm({ ...memberForm, description: e.target.value })}
                  maxLength="500"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={memberForm.email}
                    onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={memberForm.phone}
                    onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                    maxLength="20"
                  />
                </div>
              </div>

              <div className="social-links">
                <h4>Social Links (Optional):</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>LinkedIn:</label>
                    <input
                      type="url"
                      value={memberForm.socialLinks.linkedin}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          socialLinks: { ...memberForm.socialLinks, linkedin: e.target.value },
                        })
                      }
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="form-group">
                    <label>Twitter:</label>
                    <input
                      type="url"
                      value={memberForm.socialLinks.twitter}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          socialLinks: { ...memberForm.socialLinks, twitter: e.target.value },
                        })
                      }
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>
              </div>

              {memberPreview && (
                <div className="image-preview">
                  <img src={memberPreview} alt="Preview" />
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  disabled={teamMemberSaving}
                  onClick={() => {
                    setShowTeamModal(false);
                    setTeamMemberSaving(false);
                  }}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" className="save-btn save-btn--with-spinner" disabled={teamMemberSaving}>
                  {teamMemberSaving ? (
                    <>
                      <span className="admin-spinner admin-spinner--btn" aria-hidden />
                      Uploading…
                    </>
                  ) : (
                    <>{editingMember ? "Save changes" : "Add member"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Carousel Modal */}
      {showCarouselModal && (
        <div className={`modal-overlay${carouselSlideSaving ? " modal-overlay--saving" : ""}`}>
          <div className="modal-content carousel-modal admin-form-modal">
            <h3>{editingSlide ? "Edit Slide" : "Add New Slide"}</h3>
            <form onSubmit={handleSlideFormSubmit}>
              <div className="form-group">
                <label>Upload Image:</label>
                <input type="file" accept="image/*" onChange={handleSlideFileChange} />
              </div>
              <div className="separator">OR</div>
              <div className="form-group">
                <label>Image URL (Fallback):</label>
                <input
                  type="url"
                  value={slideForm.imageUrl}
                  onChange={(e) => setSlideForm({ ...slideForm, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={slideForm.title}
                  onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                  required
                  maxLength="100"
                />
              </div>
              <div className="form-group">
                <label>Subtitle:</label>
                <input
                  type="text"
                  value={slideForm.subtitle}
                  onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                  required
                  maxLength="150"
                />
              </div>
              <div className="form-group">
                <label>Order:</label>
                <input
                  type="number"
                  value={slideForm.order}
                  onChange={(e) => setSlideForm({ ...slideForm, order: parseInt(e.target.value) })}
                  min="1"
                  required
                />
              </div>
              {slidePreview && (
                <div className="image-preview">
                  <img src={slidePreview} alt="Preview" />
                </div>
              )}
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  disabled={carouselSlideSaving}
                  onClick={() => {
                    setShowCarouselModal(false);
                    setCarouselSlideSaving(false);
                  }}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" className="save-btn save-btn--with-spinner" disabled={carouselSlideSaving}>
                  {carouselSlideSaving ? (
                    <>
                      <span className="admin-spinner admin-spinner--btn" aria-hidden />
                      Uploading…
                    </>
                  ) : (
                    <>{editingSlide ? "Save changes" : "Add slide"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Client logo modal */}
      {showClientLogoModal && (
        <div className={`modal-overlay${clientLogoSaving ? " modal-overlay--saving" : ""}`}>
          <div className="modal-content carousel-modal client-logo-modal admin-form-modal">
            <h3>{editingClientLogo ? "Edit Client Logo" : "Add Client Logo"}</h3>
            <form onSubmit={handleClientLogoFormSubmit}>
              <div className="form-group">
                <label>Upload logo image:</label>
                <input type="file" accept="image/*" onChange={handleClientLogoFileChange} />
              </div>
              <div className="separator">OR</div>
              <div className="form-group">
                <label>Image URL (if not uploading a file):</label>
                <input
                  type="url"
                  value={clientLogoForm.imageUrl}
                  onChange={(e) => setClientLogoForm({ ...clientLogoForm, imageUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="form-group">
                <label>Company name (optional, for accessibility):</label>
                <input
                  type="text"
                  value={clientLogoForm.name}
                  onChange={(e) => setClientLogoForm({ ...clientLogoForm, name: e.target.value })}
                  placeholder="e.g. Client Ltd"
                  maxLength={120}
                />
              </div>
              <div className="form-group">
                <label>Position (1 = first on the page):</label>
                <input
                  type="number"
                  value={clientLogoForm.order}
                  onChange={(e) => setClientLogoForm({ ...clientLogoForm, order: parseInt(e.target.value, 10) || 1 })}
                  min={1}
                  required
                />
              </div>
              {clientLogoPreview && (
                <div className="image-preview">
                  <img src={clientLogoPreview} alt="Preview" />
                </div>
              )}
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  disabled={clientLogoSaving}
                  onClick={() => {
                    setShowClientLogoModal(false);
                    setClientLogoSaving(false);
                  }}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
                <button type="submit" className="save-btn save-btn--with-spinner" disabled={clientLogoSaving}>
                  {clientLogoSaving ? (
                    <>
                      <span className="admin-spinner admin-spinner--btn" aria-hidden />
                      Uploading…
                    </>
                  ) : (
                    <>
                      {editingClientLogo ? "Save changes" : "Add logo"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{selectedProject.title}"?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={confirmDelete}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide Delete Modal */}
      {deleteSlideId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this carousel slide?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteSlideId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={() => handleDeleteSlide(deleteSlideId)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client logo delete */}
      {deleteClientLogoId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to remove this client logo?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={() => setDeleteClientLogoId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button
                type="button"
                className="confirm-delete-btn"
                onClick={() => handleDeleteClientLogo(deleteClientLogoId)}
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Member Delete Modal */}
      {deleteMemberId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this team member?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteMemberId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={() => handleDeleteMember(deleteMemberId)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Career Photo Delete Modal */}
      {deletePhotoId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this career photo?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeletePhotoId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={() => handleDeletePhoto(deletePhotoId)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leadership Delete Modal */}
      {deleteLeaderId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this leadership message?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteLeaderId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={() => handleDeleteLeader(deleteLeaderId)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="contact-section">
          <div className="section-header">
            <h2>Contact Us Management</h2>
            <button className="add-contact-btn" onClick={handleAddContact}>
              <i className="fas fa-plus"></i> Add New Contact
            </button>
          </div>

          {contactLoading ? (
            <div className="loading">Loading contacts...</div>
          ) : (
            <>
              {/* Offices Section */}
              <div className="contact-subsection">
                <h3>Offices</h3>
                <div className="contact-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Office Name</th>
                        <th>Address</th>
                        <th>Pin Code</th>
                        <th>Contact Person</th>
                        <th>Phone/Telephone</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.offices.map((office) => (
                        <tr key={office._id}>
                          <td>{office.officeName}</td>
                          <td className="address-cell">{office.address}</td>
                          <td>{office.pinCode}</td>
                          <td>{office.contactPerson || "N/A"}</td>
                          <td>
                            {office.phone && <div>Phone: {office.phone}</div>}
                            {office.telephone && <div>Tel: {office.telephone}</div>}
                            {!office.phone && !office.telephone && "N/A"}
                          </td>
                          <td className="actions">
                            <button className="edit-btn" onClick={() => handleEditContact(office)}>
                              <i className="fas fa-edit"></i> Edit
                            </button>
                            <button className="delete-btn" onClick={() => setDeleteContactId(office._id)}>
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {contacts.offices.length === 0 && (
                        <tr>
                          <td colSpan="6" className="no-data">
                            No offices found. Add your first office.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Email Queries Section */}
              <div className="contact-subsection">
                <h3>Email Queries</h3>
                <div className="contact-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Query Type</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.emails.map((email) => (
                        <tr key={email._id}>
                          <td>
                            <span className="query-type-badge">{getQueryTypeLabel(email.queryType)}</span>
                          </td>
                          <td>
                            <a href={`mailto:${email.email}`}>{email.email}</a>
                          </td>
                          <td className="actions">
                            <button className="edit-btn" onClick={() => handleEditContact(email)}>
                              <i className="fas fa-edit"></i> Edit
                            </button>
                            <button className="delete-btn" onClick={() => setDeleteContactId(email._id)}>
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {contacts.emails.length === 0 && (
                        <tr>
                          <td colSpan="3" className="no-data">
                            No email queries found. Add your first email query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal-overlay">
          <div className="modal-content contact-modal">
            <h3>{editingContact ? "Edit Contact" : "Add New Contact"}</h3>
            <form onSubmit={handleContactFormSubmit} className="contact-form-scrollable">
              <div className="form-group">
                <label>Type:</label>
                <select
                  value={contactForm.type}
                  onChange={(e) => setContactForm({ ...contactForm, type: e.target.value })}
                  required
                  disabled={editingContact} // Prevent changing type when editing
                >
                  <option value="office">Office</option>
                  <option value="email">Email Query</option>
                </select>
              </div>

              {contactForm.type === "office" ? (
                <>
                  <div className="form-group">
                    <label>Office Name:</label>
                    <input
                      type="text"
                      value={contactForm.officeName}
                      onChange={(e) => setContactForm({ ...contactForm, officeName: e.target.value })}
                      required
                      maxLength="100"
                      placeholder="e.g., HEAD OFFICE"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address:</label>
                    <textarea
                      value={contactForm.address}
                      onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                      required
                      maxLength="500"
                      rows="4"
                      placeholder="Enter full address..."
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Pin Code:</label>
                      <input
                        type="text"
                        value={contactForm.pinCode}
                        onChange={(e) => setContactForm({ ...contactForm, pinCode: e.target.value })}
                        required
                        maxLength="10"
                        placeholder="e.g., 400703"
                      />
                    </div>
                    <div className="form-group">
                      <label>Order:</label>
                      <input
                        type="number"
                        value={contactForm.order}
                        onChange={(e) => setContactForm({ ...contactForm, order: parseInt(e.target.value) })}
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Contact Person (Optional):</label>
                    <input
                      type="text"
                      value={contactForm.contactPerson}
                      onChange={(e) => setContactForm({ ...contactForm, contactPerson: e.target.value })}
                      maxLength="100"
                      placeholder="e.g., John Doe"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone (Optional):</label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        maxLength="20"
                        placeholder="e.g., +91 93730 09191"
                      />
                    </div>
                    <div className="form-group">
                      <label>Telephone (Optional):</label>
                      <input
                        type="tel"
                        value={contactForm.telephone}
                        onChange={(e) => setContactForm({ ...contactForm, telephone: e.target.value })}
                        maxLength="30"
                        placeholder="e.g., +91- (022) 27882021"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Query Type:</label>
                    <select
                      value={contactForm.queryType}
                      onChange={(e) => setContactForm({ ...contactForm, queryType: e.target.value })}
                      required
                    >
                      <option value="marketing">Marketing</option>
                      <option value="purchase">Purchase</option>
                      <option value="hr">HR</option>
                      <option value="recruitment">Recruitment</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      placeholder="e.g., marketing@progressivegalaxy.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Order:</label>
                    <input
                      type="number"
                      value={contactForm.order}
                      onChange={(e) => setContactForm({ ...contactForm, order: parseInt(e.target.value) })}
                      min="1"
                      required
                    />
                  </div>
                </>
              )}
            </form>
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={() => setShowContactModal(false)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button type="button" className="save-btn" onClick={handleContactFormSubmit}>
                <i className="fas fa-save"></i> {editingContact ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Delete Modal */}
      {deleteContactId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this contact?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteContactId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={() => handleDeleteContact(deleteContactId)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Application Delete Modal */}
      {deleteApplicationId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this job application?</p>
            <p className="warning-text">This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setDeleteApplicationId(null)}>
                <i className="fas fa-times"></i> Cancel
              </button>
              <button className="confirm-delete-btn" onClick={() => handleDeleteApplication(deleteApplicationId)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
