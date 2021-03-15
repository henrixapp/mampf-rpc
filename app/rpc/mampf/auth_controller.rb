
module Mampf
    class AuthController < ::Gruf::Controllers::Base
      bind ::Mampf::MaMpfAuthService::Service
  
      ##
      # @return [Demo::GetJobResp] The job response
      #
      def login
        u = ::User.find_by(email:request.message.email)
        if u.valid_password?(request.message.password)
          return ::Mampf::LoginResult.new(user: ::Mampf::User.new(u.serializable_hash.slice("id","email","admin","name") ),success:true)
        else
          return ::Mampf::LoginResult.new(success:false)
        end
      rescue StandardError => _e
        p _e
        fail!(:not_found, :job_not_found, "Failed to find Job with ID: #{request.message.email}")
      end
    end
  end