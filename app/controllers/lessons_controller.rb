# LessonsController
class LessonsController < ApplicationController
  before_action :set_lesson, only: [:show, :edit, :update, :destroy, :inspect]
  authorize_resource

  def show
  end

  def edit
  end

  def new
    @lecture = Lecture.find_by_id(params[:lecture_id])
    @lesson = Lesson.new(lecture: @lecture)
  end

  def create
    @lesson = Lesson.new(lesson_params)
    @lesson.save
    if @lesson.valid?
      if params[:lesson][:from] == 'section'
        @section = Section.find_by_id(params[:lesson][:section_id])
        redirect_to edit_chapter_path(@section.chapter, section_id: @section.id)
        return
      end
      redirect_to edit_lecture_path(@lesson.lecture)
      return
    end
    @errors = @lesson.errors
    render :update
  end

  def update
    @lesson.update(lesson_params)
    redirect_to edit_lesson_path(@lesson) if @lesson.valid?
    @errors = @lesson.errors
  end

  def destroy
    lecture = @lesson.lecture
    @lesson.destroy unless @lesson.media.present?
    redirect_to edit_lecture_path(lecture)
  end

  def list_sections
    @sections = Section.where(id: JSON.parse(params[:section_ids])).order(:position)
  end

  def inspect
  end

  def modal
    @section = Section.find_by_id(params[:section])
    @lesson = Lesson.new(lecture: @section.lecture)
    @lesson.sections << @section
    @lesson.tags << @section.tags
    @from = params[:from]
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_lesson
    @lesson = Lesson.find_by_id(params[:id])
    return if @lesson.present?
    redirect_to :root, alert: 'Eine Sitzung mit der angeforderten id ' \
                              'existiert nicht.'
  end

  def lesson_params
    params.require(:lesson).permit(:date, :lecture_id, section_ids: [],
                                   tag_ids: [])
  end
end
