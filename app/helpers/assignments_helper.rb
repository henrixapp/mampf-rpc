# Assignments Helper
module AssignmentsHelper
  def cancel_editing_assignment_path(assignment)
    return cancel_edit_assignment_path(assignment) if assignment.persisted?
    cancel_new_assignment_path(params: { lecture: assignment.lecture })
  end

  def has_documents?(assignment)
    return false unless assignment.medium
    assignment.medium.video || assignment.medium.manuscript ||
      assignment.medium.geogebra ||
      assignment.medium.external_reference_link.present? ||
      (assignment.medium.sort == 'Quiz' && assignment.medium.quiz_graph)
    end
end
