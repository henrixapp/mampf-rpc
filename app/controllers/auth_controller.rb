class AuthController < ApplicationController
    respond_to :text
    layout nil
    def auth
        render :plain => current_user.id.to_s
        
    end
end