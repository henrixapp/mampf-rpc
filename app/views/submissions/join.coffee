<% if @error.nil? %>
$('.submissionArea[data-id="<%= @assignment.id %>"]').empty()
  .append('<%= j render partial: "submissions/card",
                        locals: { assignment: @assignment,
                                  submission: @submission } %>')
$('.submissionFooter .btn').prop('disabled', false)
  .removeClass('btn-outline-secondary')
$('.submissionFooter .btn').each ->
  $(this).addClass($(this).data('color'))
$('[data-toggle="popover"]').popover()
<% else %>
$('#join_code').addClass('is-invalid')
$('#submission-code-error').empty().append('<%= @error %>').show()
<% end %>
