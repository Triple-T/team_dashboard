module Sources
  module Datapoints
    class Datarow < Sources::Datapoints::Base

      def supports_target_browsing?
        true
      end

      def get(options = {})
        from    = (options[:from]).to_i
        to      = (options[:to] || Time.now).to_i

        widget  = Widget.find(options.fetch(:widget_id))
        targets = targetsArray(widget.settings.fetch(:targets))
        source  = options[:source]

        datapoints = []
        targets.each do |target|
          datapoints << { :target => target, :datapoints => ::DatarowHelper.generate_datapoints(target, from, to) }
        end
        datapoints
      end

      def available_targets(options = {})
        ::Datarow.all.order(:title).map {|row| row.title}
      end

    end
  end
end