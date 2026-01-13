"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Job } from "./types";

interface ClientRecruitmentProps {
  jobs?: Job[];
  companyName: string;
  locale: string;
}

// Mock jobs data
const DEFAULT_JOBS: Job[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Hồ Chí Minh",
    type: "full-time",
    salary: "$2,000 - $4,000",
    experience: "3-5 năm",
    postedDate: "2024-01-10",
    deadline: "2024-02-10",
    description: "Chúng tôi đang tìm kiếm một Senior Software Engineer có kinh nghiệm để tham gia vào team phát triển sản phẩm chính.",
    requirements: [
      "3-5 năm kinh nghiệm với JavaScript/TypeScript",
      "Thành thạo React, Node.js",
      "Kinh nghiệm với cloud services (AWS/GCP)",
      "Kỹ năng giao tiếp tốt",
    ],
    benefits: [
      "Lương cạnh tranh + thưởng",
      "Bảo hiểm sức khỏe cao cấp",
      "13 tháng lương",
      "Môi trường làm việc hiện đại",
    ],
    isHot: true,
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Hà Nội",
    type: "full-time",
    salary: "$2,500 - $5,000",
    experience: "5+ năm",
    postedDate: "2024-01-08",
    description: "Quản lý và phát triển roadmap sản phẩm, làm việc với các team để đưa sản phẩm đến người dùng.",
    requirements: [
      "5+ năm kinh nghiệm Product Management",
      "Hiểu biết về công nghệ",
      "Kỹ năng phân tích dữ liệu",
    ],
    isUrgent: true,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "remote",
    salary: "$1,500 - $3,000",
    experience: "2-4 năm",
    postedDate: "2024-01-05",
    description: "Thiết kế giao diện và trải nghiệm người dùng cho các sản phẩm số của công ty.",
    requirements: [
      "Thành thạo Figma, Adobe XD",
      "Portfolio ấn tượng",
      "Hiểu về UI/UX principles",
    ],
  },
  {
    id: 4,
    title: "Marketing Executive",
    department: "Marketing",
    location: "Đà Nẵng",
    type: "full-time",
    salary: "$800 - $1,500",
    experience: "1-2 năm",
    postedDate: "2024-01-12",
    description: "Xây dựng và thực hiện các chiến dịch marketing, quản lý kênh social media.",
    requirements: [
      "Kinh nghiệm digital marketing",
      "Kỹ năng viết content",
      "Hiểu về SEO/SEM",
    ],
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Hồ Chí Minh",
    type: "contract",
    salary: "Thương lượng",
    experience: "2-3 năm",
    postedDate: "2024-01-11",
    description: "Xây dựng và duy trì hạ tầng CI/CD, quản lý cloud infrastructure.",
    requirements: [
      "Kinh nghiệm với Docker, Kubernetes",
      "Thành thạo AWS/GCP",
      "Kiến thức về Linux",
    ],
  },
];

const getJobTypeStyles = (type: Job["type"]) => {
  switch (type) {
    case "full-time":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "part-time":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "contract":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "remote":
      return "bg-purple-100 text-purple-700 border-purple-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getJobTypeLabel = (type: Job["type"]) => {
  switch (type) {
    case "full-time":
      return "Toàn thời gian";
    case "part-time":
      return "Bán thời gian";
    case "contract":
      return "Hợp đồng";
    case "remote":
      return "Từ xa";
    default:
      return type;
  }
};

export default function ClientRecruitment({
  jobs = DEFAULT_JOBS,
  companyName,
  locale,
}: ClientRecruitmentProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [showApplyModal, setShowApplyModal] = useState(false);

  const departments = ["all", ...new Set(jobs.map((j) => j.department))];
  const filteredJobs = filter === "all" ? jobs : jobs.filter((j) => j.department === filter);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Tuyển dụng</h2>
        </div>
        <p className="text-white/80">
          Gia nhập {companyName} - Nơi bạn có thể phát triển và tỏa sáng
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>{jobs.length} vị trí đang tuyển</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Nhiều địa điểm</span>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-sm text-gray-500 whitespace-nowrap">Phòng ban:</span>
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setFilter(dept)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === dept
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300"
              }`}
            >
              {dept === "all" ? "Tất cả" : dept}
            </button>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="divide-y divide-gray-100">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
            onClick={() => setSelectedJob(job)}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Job Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>
                  {job.isHot && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                      HOT
                    </span>
                  )}
                  {job.isUrgent && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-xs font-medium rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      GẤP
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.experience}
                  </span>
                  {job.salary && (
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.salary}
                    </span>
                  )}
                </div>
              </div>

              {/* Tags & Action */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getJobTypeStyles(job.type)}`}>
                  {getJobTypeLabel(job.type)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJob(job);
                    setShowApplyModal(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors opacity-0 group-hover:opacity-100"
                >
                  Ứng tuyển
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      {jobs.length > 5 && (
        <div className="px-6 py-4 border-t border-gray-100 text-center bg-gray-50">
          <button className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
            Xem tất cả {jobs.length} vị trí →
          </button>
        </div>
      )}

      {/* Job Detail Modal */}
      <AnimatePresence>
        {selectedJob && !showApplyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{selectedJob.title}</h3>
                    <p className="text-white/80">{selectedJob.department} • {selectedJob.location}</p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getJobTypeStyles(selectedJob.type)}`}>
                    {getJobTypeLabel(selectedJob.type)}
                  </span>
                  {selectedJob.salary && (
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      💰 {selectedJob.salary}
                    </span>
                  )}
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    ⏱️ {selectedJob.experience}
                  </span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Mô tả công việc</h4>
                  <p className="text-gray-600">{selectedJob.description}</p>
                </div>

                {/* Requirements */}
                {selectedJob.requirements && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Yêu cầu</h4>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {selectedJob.benefits && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Quyền lợi</h4>
                    <ul className="space-y-2">
                      {selectedJob.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Deadline */}
                {selectedJob.deadline && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-amber-700">
                      Hạn nộp hồ sơ: <strong>{new Date(selectedJob.deadline).toLocaleDateString("vi-VN")}</strong>
                    </span>
                  </div>
                )}

                {/* Apply Button */}
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Ứng tuyển ngay
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowApplyModal(false);
              setSelectedJob(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                <h3 className="text-xl font-bold">Ứng tuyển vị trí</h3>
                <p className="text-white/80">{selectedJob.title}</p>
              </div>
              <form className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0912 345 678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CV của bạn *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                    <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-500">Kéo thả hoặc click để upload CV</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (tối đa 5MB)</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lời nhắn</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                    placeholder="Giới thiệu ngắn về bản thân..."
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowApplyModal(false);
                      setSelectedJob(null);
                    }}
                    className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                  >
                    Gửi hồ sơ
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

