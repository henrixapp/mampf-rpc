
module Mampf
    class LecturesController < ::Gruf::Controllers::Base
      bind ::Mampf::MaMpfLectureService::Service
  
      ##
      # @return [Demo::GetJobResp] The job response
      #
      def get_lectures_for_user
        u = ::User.find(request.message.user_id)
        lectures = u.lectures.where(term_id: request.message.term_id)
        p lectures
        
        lects = lectures.to_a.map(&:serializable_hash).map do |t| 
            t["created_at"] = t["created_at"].to_time
            t["updated_at"]= t["updated_at"].to_time
            course = ::Course.find(t["course_id"]).serializable_hash
            course["created_at"] = course["created_at"].to_time
            course["updated_at"]= course["updated_at"].to_time
            t["course"] = ::Mampf::Course.new(course)
            t
        end.map{|ts| ::Mampf::Lecture.new(ts)}#id:ts.id,year: ts.year, season: ts.season, created_at:ts.created_at.to_time,updated_at:ts.updated_at.to_time, active:ts.active?)}
        p "After",lects
        return ::Mampf::LecturesQueryResult.new(lectures: lects)
      rescue StandardError => _e
        p _e
        fail!(:not_found, :job_not_found, "Failed to find Job with ID: #{request.message.user_id}")
      end
    end
  end