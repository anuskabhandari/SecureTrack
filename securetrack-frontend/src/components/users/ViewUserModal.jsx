export default function ViewUserModal({

    user,

    onClose,

}) {

    if (!user) return null;

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-lg modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header bg-primary text-white">

                        <h4 className="modal-title">

                            User Details

                        </h4>

                        <button
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="fw-bold">
                                    Username
                                </label>

                                <p>{user.username}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="fw-bold">
                                    Email
                                </label>

                                <p>{user.email}</p>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="fw-bold">
                                    Role
                                </label>

                                <p>{user.role}</p>

                            </div>
                            <div className="col-md-6 mb-3">

    <label className="fw-bold">
        Joined Date
    </label>

    <p>
        {new Date(user.date_joined).toLocaleDateString()}
    </p>

</div>
<div className="col-md-6 mb-3">

    <label className="fw-bold">
        Status
    </label>

    <p>

        {
            user.is_active ? (
                <span className="badge bg-success">
                    Active
                </span>
            ) : (
                <span className="badge bg-danger">
                    Inactive
                </span>
            )
        }

    </p>

</div>

                            <div className="col-md-6 mb-3">

                                <label className="fw-bold">
                                    User ID
                                </label>

                                <p>{user.id}</p>

                            </div>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}