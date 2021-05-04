
var datasetScatter,selectedCategory_Scatter; 	

			//importing CSV
			//d3.csv("/Desktop/GWG2021/GWG_data_reformatted.csv",function(data){ 
			d3.csv("GWG_data_reformatted.csv",function(data){
				
				//assigning to global variable 
	    		datasetScatter = data


				function addCircle_Scatter(filteredData_Scatter, xScale_Scatter, yScale_Scatter, SubCategory_Color_Scatter){
				//adding circles 	
				svgChart_Scatter.selectAll("circle").filter(".circleWithValue")
					.data(filteredData_Scatter)
					.enter()
					.append("circle")
						.attr("class","circleWithValue")
						.attr("transform", "translate("+margin_Scatter+",0)")
						.attr("cx", xScale_Scatter(1))
						.attr("cy", yScale_Scatter(1))
						.attr("r",  7)
						.style("fill", function(d) { return SubCategory_Color_Scatter(d.SubCategory); })
						.style("stroke", function(d) { return SubCategory_Color_Scatter(d.SubCategory); })
						.style("stroke-width","2.5px")
						.style("stroke-opacity","1")
						.attr("fill-opacity","0")
						.on("mouseover", function(d,i) {
								
							var hoveredSelection_Scatter = filteredData_Scatter[i].SubCategory;

							svgChart_Scatter.selectAll("circle").style("opacity", function(d) {
										return d.SubCategory == hoveredSelection_Scatter ? 1 : 0.1; //only show highlighted with full opacity
							})

							svgChart_Scatter.selectAll("text").filter(".circleLabel").style("opacity", function(d) {
										return d.SubCategory == hoveredSelection_Scatter ? 1 : 0.1; //only show highlighted with full opacity
							})

							d3.select("#tooltip_Scatter")
								.style("left", (d3.event.pageX -5) + "px")		
								.style("top", (d3.event.pageY -70) + "px")
								.select("#TTooltipTitle_Scatter")
									.text(d.SubCategory)	

							d3.select("#tooltip_Scatter")
								.style("left", (d3.event.pageX -5) + "px")		
								.style("top", (d3.event.pageY -70) + "px")
								.select("#TooltipText1_Scatter")
									.text("Opportunity Pay Gap (Uncontrolled): "+d3.format("($.2f")(d.Uncontrolled))	
									
							d3.select("#tooltip_Scatter")
								.style("left", (d3.event.pageX -5) + "px")		
								.style("top", (d3.event.pageY -70) + "px")
								.select("#TooltipText2_Scatter")
									.text("Equal Work Pay Gap (Controlled): " +d3.format("($.2f")(d.Controlled))

							d3.select("#tooltip_Scatter")
								.style("left", (d3.event.pageX -5) + "px")		
								.style("top", (d3.event.pageY -70) + "px")
								.select("#TooltipText3_Scatter")
									.text(d.MenBLS)

							d3.select("#tooltip_Scatter")
								.style("left", (d3.event.pageX -5) + "px")		
								.style("top", (d3.event.pageY -70) + "px")
								.select("#TooltipText4_Scatter")
									.text(d.WomenBLS)			

							//Show the tooltip
							d3.select("#tooltip_Scatter").classed("hidden", false);

						}) // on mouseover
						.on("mouseout", function() {

							svgChart_Scatter.selectAll("circle").style("opacity", 1)
							svgChart_Scatter.selectAll("text").style("opacity", 1)

							//Hide the tooltip
							d3.select("#tooltip_Scatter").classed("hidden", true);
								
						}); // on mouseout

				//transition fill
				svgChart_Scatter.selectAll("circle").filter(".circleWithValue")
						.transition()
						.duration(1500)
						//.delay(0)
						.attr("cx", function(d) { return xScale_Scatter(d.Controlled); })
						.attr("cy", function(d) { return yScale_Scatter(d.Uncontrolled); })
						.attr("fill-opacity","1"); 	

				} //addCircle_Scatter Function

			function addWHITECircle_Scatter(filteredData_Scatter, xScale_Scatter, yScale_Scatter){
				//adding circles 	
				svgChart_Scatter.selectAll(".whiteCircle")
					.data([1])
					.enter()
					.append("circle")
						.attr("class","whiteCircle")
						.attr("transform", "translate("+margin_Scatter+",0)")
						.attr("cx", xScale_Scatter(1))
						.attr("cy", yScale_Scatter(1))
						.attr("r",  7)
						.style("stroke", "#d3d3d3")
						.style("stroke-width","1.5px")
						.style("stroke-opacity","1")
						.attr("fill-opacity","0")
						.on("mouseover", function(d,i) {

							d3.select("#tooltip_Scatter")
								.style("left", (d3.event.pageX -5) + "px")		
								.style("top", (d3.event.pageY -70) + "px")
								.select("#TTooltipTitle_Scatter")
									.text("White")	

							d3.select("#tooltip_Scatter")
								.style("left", (d3.event.pageX -5) + "px")		
								.style("top", (d3.event.pageY -70) + "px")
								.select("#TooltipText1_Scatter")
									.text("Opportunity Pay Gap (Uncontrolled): $1.00")	
									
							d3.select("#tooltip_Scatter")
								.style("left", (d3.event.pageX -5) + "px")		
								.style("top", (d3.event.pageY -70) + "px")
								.select("#TooltipText2_Scatter")
									.text("Equal Work Pay Gap (Controlled):$1.00")	

							//Show the tooltip
							d3.select("#tooltip_Scatter").classed("hidden", false);

						}) // on mouseover
						.on("mouseout", function() {

							svgChart_Scatter.selectAll("circle").style("opacity", 1)

							//Hide the tooltip
							d3.select("#tooltip_Scatter").classed("hidden", true);
								
						}); // on mouseout

				} //addWHITECircle_Scatter Function

				//adding labels function
				function addCircleLabels(filteredData_Scatter){
					svgChart_Scatter.selectAll(".circleLabel")
						.data(filteredData_Scatter)
						.enter()
						.append("text")
							.attr("class","circleLabel")
							.attr("fill-opacity","0")
							.attr("x", function(d) {return xScale_Scatter(d.Controlled)+76})
							.attr("y", function(d) {return yScale_Scatter(d.Uncontrolled)+4})
							.text(function(d) {return d.Label})

					svgChart_Scatter.selectAll("text").filter(".circleLabel")
						.transition()
						.duration(1)
						.delay(1500)
						.attr("fill-opacity","1")
				}

				//creating legend function
				function addLegend58(filteredData_Scatter, SubCategory_Color_Scatter){
					svgLegend_Scatter.append("g")
						.attr("class","myLegend_Scatter")
						.attr("transform", "translate(15,15)")
						.call(d3.legendColor()
							.shape("path", d3.symbol().type(d3.symbolCircle).size(175)())
							.scale(SubCategory_Color_Scatter)
							.shapePadding(4)
							.orient("vertical")
							.labelAlign("start")
							.labelWrap(178)
							.labelOffset(2)
						);
				} //creating legend function


				//legend height adjustment function 
				//pass in the class name of the the g element appended in the addLegend58 function, example .attr("class" , "myLegend_Scatter"), so when calling this function y58ou pass in "myLegend_Scatter"
				//Make sure the svg that y58ou are appending the legend too, the ID of that svg matches with the class name of the the g element appended in the addLegend58 function
				function adjustLegend58(classOfLegend) {
					
					//checks to see if smaller than 968px, which is the breaking point of the graph with the legend beside it
					if(window.innerWidth <= 968) {
						const svg = document.querySelector(`#${classOfLegend}`);
						const legend = document.querySelector(`.${classOfLegend}`);
						console.log(legend)
						const legendMaxHeight = legend.getBBox().height;
						console.log(legendMaxHeight)

						svg.setAttribute("height" , `${legendMaxHeight + 50}`)
						svg.setAttribute("viewBox" , `0 0 200 ${legendMaxHeight + 60}`)
					} else {
						console.log("Big enough so do nothing")
					}
				}


				//Width and height and other global variables
				var //margin = {top: 10, right: 10, bottom: 30, left: 10},
				width_Scatter = 700,  
				height_Scatter = 500, 
				margin_Scatter = 65, 
				heightAdj_Scatter = height_Scatter-margin_Scatter,
				widthAdj_Scatter = width_Scatter-margin_Scatter,
				selectedCategory_Scatter, hoveredSelection_Scatter, filteredData_Scatter;

				//Create SVG element for chart
				var svgChart_Scatter = d3.select("#myChart_Scatter")

				//creating SVG element for legend	
				var svgLegend_Scatter = d3.select("#myLegend_Scatter")

///////

				//converting measures 
				datasetScatter.forEach(function(d) {
					d.Category = d.Category;
					d.SubCategory = d.SubCategory;
					d.Uncontrolled = +d.Uncontrolled;
					d.Controlled = +d.Controlled;	
					d.MenBLS = d.MenBLS;
					d.WomenBLS = d.WomenBLS;
					d.Label = d.Label;
				});

				//Defining Global Scales
				var xScale_Scatter = d3.scaleLinear()
					.domain([d3.min(datasetScatter, function(d) {return d.Controlled;})-0.02, d3.max(datasetScatter, function(d) {return d.Controlled;})+0.02])
					.range([ 0, width_Scatter-margin_Scatter-20]) //width - left label padding - extra padding to see full circle
				var yScale_Scatter = d3.scaleLinear()
					.domain([d3.min(datasetScatter, function(d) {return d.Uncontrolled;})-0.02, d3.max(datasetScatter, function(d) {return d.Uncontrolled;})+0.02])
					.range([height_Scatter-margin_Scatter,0]) 


				//filter data to first selection
				filteredData_Scatter = datasetScatter
				.filter(function(d) { return d.Category == "Age" ;})

				//Defining Color Scale on filtered data
				var SubCategory_Color_Scatter = d3.scaleOrdinal()
					.domain(filteredData_Scatter.map(function(d) { return d.SubCategory;}))
					//.range(["#22D6DD","#027BC5","#01426A","#18969B","#1FBCFF","#001131","#004643","#D2CEC2","#AFDBBC","#72BD44","#B7C634","#FFED00","#F9A71C","#ED257A","#E81E26"]);	
					.range(["#FE5184","#53D1DE","#7552B9","#2E0B96","#15054B","#3880EE","#D50E51","#A9B3BC","#FDC500","#AFDBBC","#B7C634","#FFED00","#d88800","#E81E26","#22D6DD","#027BC5","#01426A","#18969B","#1FBCFF","#001131"]);	

				//creatting axes with $1.00 lines
				svgChart_Scatter.append("g")			
					.attr("class", "grid")
					.attr("transform", "translate("+margin_Scatter+",0)")
					.call(d3.axisLeft(yScale_Scatter)
						.ticks(1)
						.tickSize(-width_Scatter+100)
						.tickSizeOuter(0)
						//.tickSizeInner(0)
						.tickFormat(yScale_Scatter => ``) //makes tick label disappear
					)	
				svgChart_Scatter.append("g")			
					.attr("class", "grid")
					.attr("transform", "translate("+margin_Scatter+","+ heightAdj_Scatter +")") 
					.call(d3.axisTop(xScale_Scatter)
						.ticks(1)
						.tickSize(height_Scatter)
						.tickSizeOuter(0)
						//.tickSizeInner(0)
						.tickFormat(xScale_Scatter => ``) //makes tick label disappear
					)	

				//creating X axis and labels
				svgChart_Scatter.append("g")
					.attr("class","xaxis-Scatter")
					.attr("transform", "translate("+margin_Scatter+","+ heightAdj_Scatter +")") 
					.call(d3.axisBottom()
							.scale(xScale_Scatter)
							//.ticks(7)
							.tickFormat(xScale_Scatter => `$${xScale_Scatter.toFixed(2)}`) //$ format
							.tickSizeOuter(0) //no outer ticks
							//.tickSizeInner(0)
						)
				svgChart_Scatter.append("text")   //adding text label          
					.attr("transform", "translate(" + (width_Scatter/2+70) + " ," + (heightAdj_Scatter+40) + ")")
					.style("text-anchor", "middle")
					.text("Equal Work Pay Gap (Controlled)")
						.attr("fill","#000000")	
						.attr("font-weight", "700")	;


				//creating Y axis and labels
				svgChart_Scatter.append("g")
					.attr("class","yaxis-Scatter")
					.attr("transform", "translate("+margin_Scatter+",0)")
					.call(d3.axisLeft()
							.scale(yScale_Scatter) 
							.tickFormat(xScale_Scatter => `$${xScale_Scatter.toFixed(2)}`) //$ format
							.tickSizeOuter(0)
							//.tickSizeInner(0)
						) 
				svgChart_Scatter.append("text")   //adding text label          
					.attr("transform","translate(15,"+ (heightAdj_Scatter/2 ) +")rotate(270)")
					.style("text-anchor", "middle")
					.text("Opportunity Pay Gap (Uncontrolled)")
						.attr("fill","#000000")	
						.attr("font-weight", "600")	;

				//formating axes	
				d3.selectAll("g.tick")
					.selectAll("text")
					.attr("fill","#000000")	
					.attr("font-weight", "600")	
			
				d3.selectAll("g.tick")
					.selectAll("line")
					.attr("color","#000000")	


				// WHITECircle
				addWHITECircle_Scatter(filteredData_Scatter, xScale_Scatter, yScale_Scatter);

				// Circles 
				addCircle_Scatter(filteredData_Scatter, xScale_Scatter, yScale_Scatter, SubCategory_Color_Scatter);

				addCircleLabels(filteredData_Scatter);

				// Legend 
				addLegend58(filteredData_Scatter, SubCategory_Color_Scatter);

				//Adjust Legend when first created
				adjustLegend58("myLegend_Scatter");


				//////Updating Data and rebuilding Chart

				//dropdown SubCategory updated
				d3.select("#d3-dropdown-scatter")
				.on("change",function(d){

					selectedCategory_Scatter = d3.select("#d3-dropdown-scatter").node().value; //selected string from dropdown

					//filter data to 1 SubCategory group
					filteredData_Scatter = datasetScatter.filter(function(d) { return d.Category == selectedCategory_Scatter });

					//updating color scale to new SubCategory
					SubCategory_Color_Scatter = d3.scaleOrdinal()
						.domain(filteredData_Scatter.map(function(d) { 	return d.SubCategory;}))
						//.range(["#22D6DD","#027BC5","#01426A","#18969B","#1FBCFF","#001131","#004643","#D2CEC2","#AFDBBC","#72BD44","#B7C634","#FFED00","#F9A71C","#ED257A","#E81E26"]);	
						.range(["rgb(46,11,149)", "rgb(253,79,130)", "rgb(81,210,223)", "rgb(251,196,0)", "rgb(214,16,81)", "rgb(60,129,240)", "rgb(118,81,184)", "rgb(219,187,236)", "rgb(56,72,94)", "rgb(105,239,123)", "rgb(2,83,29)", "rgb(171,210,141)", "rgb(82,143,122)", "rgb(58,166,9)", "rgb(137,60,2)", "rgb(211,122,65)", "rgb(141,129,132)", "rgb(237,75,4)", "rgb(248,204,166)", "rgb(119,45,72)", "rgb(188,107,133)", "rgb(208,222,32)"])

					//remove unneeded circles
					svgChart_Scatter.selectAll("circle")
						.remove();

					//remove cirlce labels
					svgChart_Scatter.selectAll("text").filter(".circleLabel")
						.remove();

					//remove unneeded legend
					svgLegend_Scatter.selectAll("g")
						.remove();

					// create new WHITECircle
					addWHITECircle_Scatter(filteredData_Scatter, xScale_Scatter, yScale_Scatter);

					//create new circles 
					addCircle_Scatter(filteredData_Scatter, xScale_Scatter, yScale_Scatter, SubCategory_Color_Scatter);

					addCircleLabels(filteredData_Scatter);

					// Legend 
					addLegend58(filteredData_Scatter, SubCategory_Color_Scatter);
					
					//Adjust legend
					adjustLegend58("myLegend_Scatter");

				}); //dropdown update

				}); //data import