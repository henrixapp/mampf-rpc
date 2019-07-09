class Quiz < Medium
  def self.new_prefilled
    Quiz.new(level: 1,
             quiz_graph: QuizGraph.new(vertices: {}, edges: {}, root: 0,
                                       default_table: {}, hide_solution: []))
  end

  def self.create_prefilled(label)
    Quiz.create(level: 1,
                quiz_graph: QuizGraph.new(vertices: {}, edges: {}, root: 0,
                                          default_table: {}, hide_solution: []))
  end

  def label
    description
  end

  def next_vertex(progress, fallback, input = {})
    return default_table[progress] if vertices[progress][:type] == 'Remark'
    target = target_vertex(progress, input)
    return target unless target.zero? && fallback
    default_table[progress]
  end

  def replace_reference!(old_quizzable, new_quizzable, answer_map = {})
    update(quiz_graph: quiz_graph.replace_reference!(old_quizzable,
                                                     new_quizzable, answer_map))
  end

  def vertices
    return if quiz_graph.nil?
    quiz_graph.vertices
  end

  def edges
    return if quiz_graph.nil?
    quiz_graph.edges
  end

  def root
    return if quiz_graph.nil?
    quiz_graph.root
  end

  def default_table
    return if quiz_graph.nil?
    quiz_graph.default_table
  end

  def question_ids
    return [] unless quiz_graph && quiz_graph.vertices.present?
    quiz_graph.vertices.select { |_k, v| v[:type] == 'Question' }
              .values.map { |v| v[:id] }.uniq
  end

  def remark_ids
    return [] unless quiz_graph && quiz_graph.vertices.present?
    quiz_graph.vertices.select { |_k, v| v[:type] == 'Remark' }.values
              .map { |v| v[:id] }.uniq
  end

  def crosses_to_input(vertex_id, crosses)
    vertex = vertices[vertex_id]
    input = {}
    if vertex[:type] == 'Question'
      question = Question.find(vertex[:id])
      crosses = crosses.map(&:to_i)
      input = question.answers.map { |a| [a.id, crosses.include?(a.id)] }.to_h
    end
    input
  end

  def quizzable(vertex_id)
    quiz_graph.quizzable(vertex_id)
  end

  def preselected_branch(vertex_id, crosses)
    next_vertex(vertex_id, false, crosses)
  end

  def preselected_hide_solution(vertex_id, crosses)
    target_id = preselected_branch(vertex_id, crosses)
    [vertex_id, target_id, crosses].in?(quiz_graph.hide_solution)
  end

  def questions
    ids = quiz_graph&.vertices&.values&.select { |v| v[:type] == 'Question' }
                    &.map { |v| v[:id] }
    Question.where(id: ids)
  end

  def questions_count
    return 0 unless quiz_graph
    quiz_graph.questions_count
  end

  private

  def target_vertex(progress, input)
    edges.select { |e, t| e[0] == progress && t.include?(input) }.keys.first[1]
  end
end
