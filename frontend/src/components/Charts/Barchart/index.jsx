import React, { useState, memo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ArraysToMap, isNumber } from "../../../utils";
import classNames from "classnames";

const BarChart = memo(({ data }) => {
	const columns = data?.columns;
	const execute = data?.execute;
	const yStart = data?.execute[0].findIndex((e) => isNumber(e));
	const mapData = ArraysToMap(columns, execute);
	const [axis, setAxis] = useState({
		x: 0,
		y: yStart,
	});

	return (
		<>
			<div className="markdown prose w-full break-words dark:prose-invert dark text-sm leading-6 p-2 mt-4">
				<p>
					<strong>Visualization:</strong>
				</p>

				<div className="flex flex-col"></div>
				<ul className="w-full menu menu-vertical lg:menu-horizontal bg-base-400 text-zinc-800 gap-2 text-xs">
					{columns.map((col, idx) => (
						<li
							onClick={() => {
								setAxis({ ...axis, y: idx });
							}}
							className={classNames({
								"bg-[#bdc] text-zinc-800 rounded-lg":
									axis["y"] === idx,
							})}
							key={idx}
						>
							<a>{col}</a>
						</li>
					))}
				</ul>

				<ul className="menu menu-vertical lg:menu-horizontal bg-base-400 text-zinc-800 gap-2 text-xs">
					{columns.map((col, idx) => (
						<li
							onClick={() => {
								setAxis({ ...axis, x: idx });
							}}
							className={classNames({
								"bg-[#bdc] text-zinc-800 rounded-lg":
									axis["x"] === idx,
							})}
							key={idx}
						>
							<a>{col}</a>
						</li>
					))}
				</ul>
			</div>

			<div style={{ height: "400px" }}>
				<ResponsiveBar
					data={mapData}
					keys={[columns[axis["y"]]]}
					indexBy={columns[axis["x"]]}
					margin={{ top: 30, right: 0, bottom: 50, left: 60 }}
					padding={0.3}
					colors={"#bdc"}
					labelSkipWidth={12}
					labelSkipHeight={12}
					labelTextColor={{
						from: "color",
						modifiers: [["darker", 1.6]],
					}}
					animate={true}
					motionStiffness={90}
					motionDamping={15}
				/>
			</div>
		</>
	);
});

export default BarChart;
