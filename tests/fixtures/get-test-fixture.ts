import { Circuit } from "lib/Circuit"
import { logSoup } from "@tscircuit/log-soup"
import "lib/register-catalogue"
import "./extend-expect-circuit-snapshot"

export const getTestFixture = () => {
  const circuit = new Circuit()

  return {
    circuit,
    project: circuit,
    logSoup: async (nameOfTest: string) => {
      if (process.env.CI) return
      if (!project.firstChild?.renderPhaseStates.SourceRender.initialized) {
        project.render()
      }
      await logSoup(`core_${nameOfTest}`, project.getSoup())
    },
  }
}
