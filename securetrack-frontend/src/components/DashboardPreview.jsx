export default function DashboardPreview({ stats }) {

    return (

        <div className="container py-5 text-center">

            <h2 className="fw-bold mb-5">

                System Overview (Preview)

            </h2>

            <div className="row g-4">

                <div className="col-md-3">

                    <div className="card shadow-sm p-4">

                        <h3 className="text-danger">

                            {stats?.critical ?? 0}

                        </h3>

                        <p>Critical Vulnerabilities</p>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm p-4">

                        <h3 className="text-warning">

                            {stats?.open ?? 0}

                        </h3>

                        <p>Open Vulnerabilities</p>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm p-4">

                        <h3 className="text-success">

                            {stats?.resolved ?? 0}

                        </h3>

                        <p>Resolved Vulnerabilities</p>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm p-4">

                        <h3 className="text-primary">

                            {stats?.total_users ?? 0}

                        </h3>

                        <p>Registered Users</p>

                    </div>

                </div>

            </div>

        </div>

    );

}