import { AppShell } from '@astryxdesign/core/AppShell'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Grid } from '@astryxdesign/core/Grid'
import { Heading } from '@astryxdesign/core/Heading'
import { HStack } from '@astryxdesign/core/HStack'
import { Layout } from '@astryxdesign/core/Layout'
import { Section } from '@astryxdesign/core/Section'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'

const metrics = [
  { label: 'Open roles', value: '28', detail: '6 awaiting review' },
  { label: 'Active candidates', value: '1,284', detail: '142 new this week' },
  { label: 'Interviews today', value: '18', detail: '4 final rounds' },
]

const roles = [
  { title: 'Senior Frontend Engineer', team: 'Product', status: 'Interviewing' },
  { title: 'Talent Operations Lead', team: 'People', status: 'Screening' },
  { title: 'Backend Platform Engineer', team: 'Infrastructure', status: 'Offer' },
]

function App() {
  return (
    <AppShell contentPadding={4} height="auto" variant="section">
      <Layout
        contentWidth={960}
        content={
          <VStack gap={6}>
            <HStack gap={3} align="center" justify="between" wrap="wrap">
              <VStack gap={1}>
                <Heading level={1}>Job portal</Heading>
                <Text color="secondary">
                  Track roles, candidates, and interviews from one hiring view.
                </Text>
              </VStack>
              <Button label="Post a job" variant="primary" />
            </HStack>

            <Grid columns={{ minWidth: 220, max: 3 }} gap={4}>
              {metrics.map((metric) => (
                <Card key={metric.label}>
                  <VStack gap={2}>
                    <Text type="label" color="secondary">
                      {metric.label}
                    </Text>
                    <Heading level={2} type="display-3">
                      {metric.value}
                    </Heading>
                    <Text type="supporting">{metric.detail}</Text>
                  </VStack>
                </Card>
              ))}
            </Grid>

            <Section padding={0}>
              <VStack gap={0}>
                <HStack gap={3} padding={4} align="center" justify="between">
                  <VStack gap={1}>
                    <Heading level={2}>Priority roles</Heading>
                    <Text type="supporting">
                      Roles with the highest hiring activity.
                    </Text>
                  </VStack>
                  <Button label="Review pipeline" variant="secondary" size="sm" />
                </HStack>

                {roles.map((role) => (
                  <HStack
                    key={role.title}
                    gap={3}
                    padding={4}
                    align="center"
                    justify="between"
                  >
                    <VStack gap={1}>
                      <Text weight="semibold">{role.title}</Text>
                      <Text type="supporting">{role.team}</Text>
                    </VStack>
                    <Text type="label" color="accent">
                      {role.status}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Section>
          </VStack>
        }
      />
    </AppShell>
  )
}

export default App
