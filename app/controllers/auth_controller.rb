class AuthController < ApplicationController
    respond_to :text
    layout nil
    def auth
        p current_user
        render :plain => current_user.id.to_s
        
    end
end