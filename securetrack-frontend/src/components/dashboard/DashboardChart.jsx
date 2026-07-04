import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

const COLORS = [

    "#ef4444",

    "#f59e0b",

    "#3b82f6",

    "#22c55e"

];

export default function DashboardChart({ dashboard }) {

    const data = [

        {
            name: "Critical",
            value: dashboard.critical
        },

        {
            name: "Open",
            value: dashboard.open
        },

        {
            name: "In Progress",
            value: dashboard.in_progress
        },

        {
            name: "Resolved",
            value: dashboard.resolved
        }

    ];

    return (

        <div className="chart-card">

            <h3>Vulnerability Overview</h3>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={120}
                        label
                    >

                        {

                            data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}