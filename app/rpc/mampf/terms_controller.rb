
module Mampf
    class TermsController < ::Gruf::Controllers::Base
      bind ::Mampf::MaMpfTermService::Service
  
      ##
      # @return [Demo::GetJobResp] The job response
      #
      def get_terms
        u = ::User.find(request.message.user_id)
        terms = u.lectures.map{|l| l.term}.uniq.filter{|t| !t.nil?}
        tems_ = terms.to_a.map(&:serializable_hash).map do |t| 
            t["created_at"] = t["created_at"].to_time
            t["updated_at"]= t["updated_at"].to_time
            t.except("submission_deletion_mail", "submission_deletion_reminder", "submissions_deleted_at")
        end.map{|ts| ::Mampf::Term.new(ts)}#id:ts.id,year: ts.year, season: ts.season, created_at:ts.created_at.to_time,updated_at:ts.updated_at.to_time, active:ts.active?)}
        return ::Mampf::TermsRequestResult.new(terms: tems_)
      rescue StandardError => _e
        p _e
        fail!(:not_found, :job_not_found, "Failed to find Job with ID: #{request.message.user_id}")
      end
    end
  end