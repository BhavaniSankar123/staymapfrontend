import React, { useState } from "react";
import {
  FiSearch,
  FiMapPin,
  FiChevronRight,
  FiX,
  FiBriefcase,
  FiCheck,
} from "react-icons/fi";

import { jobPositions, jobDetails, categories } from "../utils/Constants";

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredJobs = jobPositions.filter((job) => {
    const matchesSearch =
      job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || job?.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const getJobDetails = (jobTitle) => {
    return jobDetails[jobTitle] || {
      title: jobTitle,
      location: jobPositions.find(job => job.title === jobTitle)?.location || "Hyderabad, India",
      description: "Join our team and contribute to our growing platform.",
      responsibilities: [
        "Collaborate with team members on projects",
        "Follow company policies and procedures",
        "Meet performance goals and metrics",
        "Participate in training and development programs"
      ],
      requirements: [
        "Relevant experience in the field",
        "Strong communication skills",
        "Ability to work in a team environment",
        "Problem-solving mindset"
      ],
      status: jobPositions.find(job => job.title === jobTitle)?.available ? "Active Hiring" : "No longer available"
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-purple-700 opacity-90"></div>
        <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Build the future of accommodations with us
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Join Staymap and help reshape how people discover places to stay.
            </p>

            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-indigo-300 h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Search job positions..."
                className="block w-full pl-12 pr-4 py-4 border-0 rounded-lg bg-white/10 text-white placeholder-indigo-200 focus:ring-2 focus:ring-white focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide space-x-1 py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === category.id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FiBriefcase className="mr-2 text-indigo-600" />
              {
                activeTab === "all"
                  ? "All Open Positions"
                  : categories.find((c) => c.id === activeTab).name} Roles
              <span className="ml-2 bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {filteredJobs.length}
              </span>
            </h2>

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden relative ${!job.available ? "opacity-80" : ""
                      }`}
                  >
                    {!job.available && (
                      <div className="bg-red-50 text-red-800 px-4 py-2 text-sm font-medium">
                        No longer available
                      </div>
                    )}
                    <button
                      className="w-full text-left p-6 flex justify-between items-start"
                      onClick={() => setSelectedJob(job)}
                    >
                      <div>
                        <h3 className={`text-lg font-semibold ${!job.available ? "text-gray-500" : "text-gray-900"
                          }`}>
                          {job.title}
                        </h3>
                        <div className="flex items-center mt-2 text-gray-600">
                          <FiMapPin className="mr-2 text-indigo-500" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="hidden sm:inline-block mr-3 text-sm text-gray-500">
                          {job.available ? "View details" : "Closed"}
                        </span>
                        <FiChevronRight className="text-indigo-500" />
                      </div>
                    </button>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No positions found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Why Join Staymap?
              </h2>
              <ul className="space-y-4">
                {[
                  "Competitive salaries and benefits",
                  "Flexible work arrangements",
                  "Opportunities for growth",
                  "Impactful work in a growing industry",
                ].map((text, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="text-indigo-500 mt-1" />
                    <p className="ml-3 text-gray-700">{text}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Not seeing the right role?
                </h3>
                <p className="text-gray-600 mb-4">
                  We're always looking for talented people. Send us your resume!
                </p>
                <button className="w-full cursor-not-allowed bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
                  Submit General Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`p-6 sticky top-0 z-10 ${selectedJob.available
              ? 'bg-gradient-to-r from-indigo-700 to-purple-600 text-white'
              : 'bg-gray-200 text-gray-800'
              }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                  <div className="flex items-center mt-2">
                    <FiMapPin className="mr-2" style={{
                      color: selectedJob.available ? '#bfdbfe' : '#6b7280'
                    }} />
                    <span>{selectedJob.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-1"
                  style={{
                    color: selectedJob.available ? 'white' : '#6b7280'
                  }}
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedJob.available
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {selectedJob.available ? "Active Hiring" : "No longer available"}
                </span>
              </div>

              <p className="text-gray-700 mb-6">
                {getJobDetails(selectedJob.title).description}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Key Responsibilities
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {getJobDetails(selectedJob.title).responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="text-indigo-500 mt-1" />
                      <span className="ml-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Requirements
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {getJobDetails(selectedJob.title).requirements.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="text-indigo-500 mt-1" />
                      <span className="ml-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-colors"
                >
                  Back to Listings
                </button>
                {selectedJob.available ? (
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
                    Apply Now
                  </button>
                ) : (
                  <button className="flex-1 bg-indigo-600 cursor-not-allowed hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
                    Notify Me When Available
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;