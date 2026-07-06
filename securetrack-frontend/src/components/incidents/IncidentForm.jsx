import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function IncidentForm({ incident,onSuccess, }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");

    const [vulnerability, setVulnerability] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [developers, setDevelopers] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetchVulnerabilities();
        fetchDevelopers();

    }, []);
    useEffect(() => {

    if (incident) {

        setTitle(incident.title);

        setDescription(incident.description);

        setPriority(incident.priority);

        setVulnerability(incident.vulnerability);

        setAssignedTo(incident.assigned_to || "");

    }

}, [incident]);

    const fetchVulnerabilities = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/vulnerabilities/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setVulnerabilities(response.data);

        } catch (error) {

            toast.error("Failed to load vulnerabilities.");

        }

    };

    const fetchDevelopers = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/developers/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDevelopers(response.data);

        } catch (error) {

            toast.error("Failed to load developers.");

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title.trim()) {
            toast.warning("Incident title is required.");
            return;
        }

        if (!description.trim()) {
            toast.warning("Incident description is required.");
            return;
        }

        if (!vulnerability) {
            toast.warning("Please select a vulnerability.");
            return;
        }

        if (!assignedTo) {
            toast.warning("Please assign a developer.");
            return;
        }

        setLoading(true);

        try {

            const token = localStorage.getItem("access");

            if (incident) {

    await axios.put(

        `http://127.0.0.1:8000/api/incidents/${incident.id}/`,

        {
            title,
            description,
            vulnerability,
            assigned_to: assignedTo,
            priority,
            status: incident.status,
            resolution_notes: incident.resolution_notes,
        },

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    toast.success("Incident updated successfully.");

} else {

    await axios.post(

        "http://127.0.0.1:8000/api/incidents/",

        {
            title,
            description,
            vulnerability,
            assigned_to: assignedTo,
            priority,
        },

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    toast.success("Incident created successfully.");

}
            if (!incident) {

                  setTitle("");

                   setDescription("");

                  setPriority("Medium");

                  setAssignedTo("");

                  setVulnerability("");

            }

            onSuccess();

        } catch (error) {

            if (error.response?.data) {

                Object.values(error.response.data).forEach((message) => {

                    toast.error(message.toString());

                });

            } else {

                toast.error("Failed to create incident.");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <label className="form-label fw-semibold">

                    Incident Title

                </label>

                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter incident title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

            </div>

            <div className="mb-3">

                <label className="form-label fw-semibold">

                    Description

                </label>

                <textarea
                    rows="4"
                    className="form-control"
                    placeholder="Describe the incident..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

            </div>

            <div className="mb-3">

                <label className="form-label fw-semibold">

                    Related Vulnerability

                </label>

                <select
                    className="form-select"
                    value={vulnerability}
                    onChange={(e) => setVulnerability(e.target.value)}
                >

                    <option value="">
                        Select Vulnerability
                    </option>

                    {

                        vulnerabilities.map((item) => (

                            <option
                                key={item.id}
                                value={item.id}
                            >

                                {item.title}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div className="mb-3">

                <label className="form-label fw-semibold">

                    Assign Developer

                </label>

                <select
                    className="form-select"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                >

                    <option value="">
                        Select Developer
                    </option>

                    {

                        developers.map((dev) => (

                            <option
                                key={dev.id}
                                value={dev.id}
                            >

                                {dev.username}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div className="mb-4">

                <label className="form-label fw-semibold">

                    Priority

                </label>

                <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >

                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>

                </select>

            </div>

            <div className="d-flex justify-content-end">

                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                >

                    {

                        loading

                             ? incident
                                 ? "Updating Incident..."
                                 : "Creating Incident..."
                             : incident
                                 ? "Update Incident"
                                 : "Create Incident"

                    }

                </button>

            </div>

        </form>

    );

}